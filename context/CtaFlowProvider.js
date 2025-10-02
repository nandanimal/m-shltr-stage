import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import StepZip from "../components/steps/StepZip";
import StepForm from "../components/steps/StepForm";
import StepCalendly from "../components/steps/StepCalendly";

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

    const portalTarget =
        typeof window !== "undefined"
            ? document.getElementById("modal-root")
            : null;
    if (!portalTarget) return null;

    const Step = steps[step].Component;

    return ReactDOM.createPortal(
        <div style={styles.backdrop} role="dialog" aria-modal="true">
            <div style={styles.modal}>
                <button
                    style={styles.closeBtn}
                    onClick={closeCta}
                    aria-label="Close"
                >
                    ×
                </button>
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
