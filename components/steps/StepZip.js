import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import zipList from "../../data/serviceableZips.json";

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
        const allowed = zipList.includes(z);
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
        console.log("Waitlist submitted:", { zip, email: waitlistEmail });
        alert("Thanks! Well let you know when we launch in your area.");
        closeCta();
    }

    return (
        <div>
            {mode === "zip" ? (
                <form onSubmit={handleZipSubmit}>
                    <div className="text-3xl">
                        Where are you planning to build?
                    </div>
                    <h2 className="m-0 mt-8">Enter your ZIP code</h2>

                    <input
                        id="zip"
                        name="zip"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={zip}
                        onChange={(e) => {
                            setError("");
                            setZip(normalizeZip(e.target.value));
                        }}
                        placeholder="e.g. 94607"
                        className="w-full mt-2 p-1  border-b border-black  focus:outline-none text-3xl font-mono"
                        required
                    />
                    {error ? (
                        <div className="text-red-600 mt-2">{error}</div>
                    ) : null}
                    <div className="flex gap-2 mt-4 w-full items-end justify-end">
                        <button type="submit" className="cta-button text-black">
                            Next
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <div className="rounded mt-3 mb-3">
                        Unfortunately, we don&apos;t serve <b>{zip}</b> yet.
                        Leave your email and we&apos;ll notify you when we
                        expand!
                    </div>
                    <form onSubmit={handleWaitlistSubmit}>
                        <label
                            htmlFor="waitlistEmail"
                            className="block mt-8 text-black"
                        >
                            Email
                        </label>
                        <input
                            id="waitlistEmail"
                            name="waitlistEmail"
                            type="email"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full mt-2 p-1  border-b border-black  focus:outline-none text-3xl font-mono"
                            required
                        />
                        <button type="submit" className="cta-button mt-4">
                            Notify Me
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
