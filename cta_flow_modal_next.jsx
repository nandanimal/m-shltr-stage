// =============================
// Next.js Pages Router (Plain JS) — Reusable CTA Flow Modal
// - Single provider mounted in _app.js
// - Client-only flow per Next.js forms guide (no server validation; simple onSubmit)
// - JSON allowlist for serviceable ZIP codes
// - Steps: Zip → Lead Form → Calendly (or Waitlist email + exit)
// =============================

// =============================
// pages/_app.js
// =============================
import { CtaFlowProvider } from "../components/CtaFlowProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <CtaFlowProvider>
      <Component {...pageProps} />
    </CtaFlowProvider>
  );
}

// =============================
// pages/_document.js
// =============================
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          {/* Portal target for the modal */}
          <div id="modal-root" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// =============================
// pages/index.js (demo trigger)
// =============================
import { useCtaFlow } from "../components/CtaFlowProvider";

export default function HomePage() {
  const { openCta } = useCtaFlow();
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <button
        onClick={() => openCta({ source: "home_hero" })}
        style={{ padding: "12px 20px", borderRadius: 8, border: "1px solid #222", cursor: "pointer" }}
      >
        Get Started
      </button>
    </div>
  );
}

// =============================
// Serviceable ZIP logic (prefix-based, no JSON file needed)
// USPS 3-digit prefix ranges for CA, AZ, NV, UT
// =============================

// =============================
// components/CtaFlowProvider.js
// =============================
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import StepZip from "./steps/StepZip";
import StepForm from "./steps/StepForm";
import StepCalendly from "./steps/StepCalendly";

const CtaFlowContext = createContext(null);

export function CtaFlowProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Shared flow data
  const [data, setData] = useState({
    launchSource: null,
    zip: "",
    eligibility: null, // 'allowed' | 'waitlist'
    name: "",
    email: "",
    phone: "",
    address: "",
    projectType: "ADU",
    timeline: "",
    notes: "",
    calendlyScheduled: false,
  });

  const openCta = (opts = {}) => {
    setData((d) => ({ ...d, launchSource: opts.source || null }));
    setIsOpen(true);
    setStep(0);
  };

  const closeCta = () => setIsOpen(false);
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const steps = useMemo(
    () => [
      { id: "zip", Component: StepZip },
      { id: "form", Component: StepForm },
      { id: "calendly", Component: StepCalendly },
    ],
    []
  );

  // Escape to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeCta();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = {
    isOpen,
    step,
    steps,
    data,
    loading,
    openCta,
    closeCta,
    next,
    prev,
    update,
    setLoading,
  };

  return (
    <CtaFlowContext.Provider value={value}>
      {children}
      <CtaFlowModal />
    </CtaFlowContext.Provider>
  );
}

export function useCtaFlow() {
  const ctx = useContext(CtaFlowContext);
  if (!ctx) throw new Error("useCtaFlow must be used within CtaFlowProvider");
  return ctx;
}

function CtaFlowModal() {
  const { isOpen, closeCta, step, steps } = useCtaFlow();
  if (!isOpen) return null;

  const portalTarget = typeof window !== "undefined" ? document.getElementById("modal-root") : null;
  if (!portalTarget) return null;

  const Step = steps[step].Component;

  return ReactDOM.createPortal(
    <div style={styles.backdrop} role="dialog" aria-modal="true">
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={closeCta} aria-label="Close">×</button>
        <div style={{ padding: 24 }}>
          <Step />
        </div>
      </div>
    </div>,
    portalTarget
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 12,
  },
  modal: {
    width: "min(720px, 92vw)",
    maxHeight: "90vh",
    overflow: "auto",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fafafa",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: "20px",
  },
};

// =============================
// components/steps/StepZip.js
// =============================
import { useState, useEffect } from "react";
import { useCtaFlow } from "../CtaFlowProvider";
// Serviceable states by USPS 3-digit ZIP prefix:
// CA: 900-908, 910-928, 930-961
// AZ: 850-853, 855-857, 859-860, 863-865
// NV: 889-898
// UT: 840-847
const SERVICE_PREFIXES = [
  [840, 847], // UT
  [850, 853], [855, 857], [859, 860], [863, 865], // AZ
  [889, 898], // NV
  [900, 908], [910, 928], [930, 961], // CA
];

function isServiceableZip(zip) {
  const prefix = parseInt(zip.slice(0, 3), 10);
  return SERVICE_PREFIXES.some(([lo, hi]) => prefix >= lo && prefix <= hi);
}

export default function StepZip() {
  const { data, update, next, closeCta } = useCtaFlow();
  const [zip, setZip] = useState(data.zip || "");
  const [mode, setMode] = useState("zip"); // 'zip' | 'waitlist'
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setZip(data.zip || "");
  }, [data.zip]);

  function normalizeZip(val) {
    return (val || "").replace(/[^0-9]/g, "").slice(0, 5);
  }

  function handleZipSubmit(e) {
    e.preventDefault();
    const z = normalizeZip(zip);
    if (z.length !== 5) {
      setError("Please enter a 5-digit ZIP code.");
      return;
    }
    const allowed = isServiceableZip(z);
    if (allowed) {
      update({ zip: z, eligibility: "allowed" });
      next(); // proceed to StepForm
    } else {
      update({ zip: z, eligibility: "waitlist" });
      setMode("waitlist");
    }
  }

  function handleWaitlistSubmit(e) {
    e.preventDefault();
    // Client-only demo: simply log and close. Replace with your API later.
    alert("Thanks! We'll let you know when we launch in your area.");
    closeCta();
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Check your ZIP code</h2>
      <p style={{ color: "#555" }}>We currently serve select areas. Enter your ZIP to continue.</p>

      {mode === "zip" ? (
        <form onSubmit={handleZipSubmit}>
          <label htmlFor="zip" style={{ display: "block", fontWeight: 600, marginTop: 12 }}>ZIP code</label>
          <input
            id="zip"
            name="zip"
            inputMode="numeric"
            pattern="[0-9]*"
            value={zip}
            onChange={(e) => { setError(""); setZip(normalizeZip(e.target.value)); }}
            placeholder="e.g. 94607"
            style={inputStyle}
            required
          />
          {error ? <div style={{ color: "#b00020", marginTop: 8 }}>{error}</div> : null}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button type="submit" style={btnPrimary}>Submit</button>
          </div>
        </form>
      ) : (
        <div>
          <div style={{ background: "#fff8e1", border: "1px solid #ffe082", padding: 12, borderRadius: 8, margin: "12px 0" }}>
            We don't serve <b>{zip}</b> yet. Leave your email and we'll notify you when we expand.
          </div>
          <form onSubmit={handleWaitlistSubmit}>
            <label htmlFor="waitlistEmail" style={{ display: "block", fontWeight: 600, marginTop: 12 }}>Email</label>
            <input
              id="waitlistEmail"
              name="waitlistEmail"
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
              required
            />
            <button type="submit" style={btnPrimary}>Notify Me</button>
          </form>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: 8,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
};

const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  marginTop: 12,
};

// =============================
// components/steps/StepForm.js
// =============================
import { useState, useEffect } from "react";
import { useCtaFlow } from "../CtaFlowProvider";

export default function StepForm() {
  const { data, update, next, prev } = useCtaFlow();

  // Local mirrors to use simple HTML form semantics
  const [form, setForm] = useState({
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    address: data.address || "",
    projectType: data.projectType || "ADU",
    timeline: data.timeline || "",
    notes: data.notes || "",
  });

  useEffect(() => {
    setForm((f) => ({ ...f, projectType: data.projectType || "ADU" }));
  }, [data.projectType]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Client-only: stash in context and continue
    update({ ...form });
    // In a real app you'd POST here; we're keeping it simple per guide
    next();
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Tell us about your project</h2>
      <p style={{ color: "#555" }}>ZIP {data.zip} — great, we serve your area.</p>

      <form onSubmit={onSubmit}>
        <Field label="Your name" name="name" value={form.name} onChange={onChange} required />
        <Field label="Your email" type="email" name="email" value={form.email} onChange={onChange} required />
        <Field label="Your phone number" name="phone" value={form.phone} onChange={onChange} required />
        <Field label="Your address (optional)" name="address" value={form.address} onChange={onChange} />

        <label style={labelStyle}>What are you looking to build?</label>
        <select name="projectType" value={form.projectType} onChange={onChange} style={inputStyle}>
          <option value="ADU">ADU</option>
          <option value="Single Family">Single Family</option>
          <option value="Other">Other</option>
        </select>

        <Field label="Timeline — When are you hoping to start?" name="timeline" value={form.timeline} onChange={onChange} />

        <label style={labelStyle}>Anything else you'd like to add?</label>
        <textarea name="notes" value={form.notes} onChange={onChange} rows={4} style={inputStyle} placeholder="Optional details…" />

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button type="button" onClick={prev} style={btnSecondary}>Back</button>
          <button type="submit" style={btnPrimary}>Continue</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div style={{ marginTop: 12 }}>
      <label style={labelStyle} htmlFor={name}>{label}{required ? " *" : ""}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} style={inputStyle} required={required} />
    </div>
  );
}

const labelStyle = { display: "block", fontWeight: 600, marginTop: 12 };
const btnSecondary = { ...btnPrimary, background: "#f2f2f2", color: "#111" };

// =============================
// components/steps/StepCalendly.js
// =============================
import { useEffect, useRef } from "react";
import { useCtaFlow } from "../CtaFlowProvider";

export default function StepCalendly() {
  const { data, prev, closeCta } = useCtaFlow();
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Calendly widget script once per mount
    const existing = document.getElementById("calendly-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "calendly-script";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const prefillParams = new URLSearchParams({
    name: data.name || "",
    email: data.email || "",
  }).toString();

  // Replace with your real scheduling link
  const calendlyUrl = `https://calendly.com/your-team/intro-call?hide_gdpr_banner=1&${prefillParams}`;

  return (
    <div>
      <h2 style={{ margin: 0 }}>Schedule your call</h2>
      <p style={{ color: "#555" }}>We prefilled your info so this should be quick.</p>

      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-url={calendlyUrl}
        // style={{ minWidth: 320, height: 900, border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={prev} style={btnSecondary}>Back</button>
        <button onClick={closeCta} style={btnPrimary}>Done</button>
      </div>
    </div>
  );
}
