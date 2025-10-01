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
        alert("Thanks! We'll let you know when we launch in your area.");
        closeCta();
    }

    return (
        <div>
            <h2 className="m-0">Check your ZIP code</h2>
            <p className="text-gray-600">
                We currently serve select areas. Enter your ZIP to continue.
            </p>

            {mode === "zip" ? (
                <form onSubmit={handleZipSubmit}>
                    <label htmlFor="zip" className="block font-semibold mt-3">
                        ZIP code
                    </label>
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
                        className="w-full mt-2 p-2 border border-gray-300 rounded text-base"
                        required
                    />
                    {error ? (
                        <div className="text-red-600 mt-2">{error}</div>
                    ) : null}
                    <div className="flex gap-2 mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 rounded border border-black bg-black text-white cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <div className="bg-yellow-100 border border-yellow-300 p-3 rounded mt-3 mb-3">
                        We don't serve <b>{zip}</b> yet. Leave your email and
                        we'll notify you when we expand.
                    </div>
                    <form onSubmit={handleWaitlistSubmit}>
                        <label
                            htmlFor="waitlistEmail"
                            className="block font-semibold mt-3"
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
                            className="w-full mt-2 p-2 border border-gray-300 rounded text-base"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded border border-black bg-black text-white cursor-pointer mt-3"
                        >
                            Notify Me
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
