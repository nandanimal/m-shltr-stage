import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
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
    const { data, update, goTo } = useCtaFlow();
    const [zip, setZip] = useState(data.zip || "");
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
        update({ zip: z, eligibility: allowed ? "allowed" : "waitlist" });
        goTo(allowed ? "email" : "waitlist");
    }

    return (
        <form onSubmit={handleZipSubmit} className="w-full">
            <div className="type-h2 font-dince">
                What is the ZIP code for your project?
            </div>

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
                className="w-full mt-8 p-1 border-b border-black focus:outline-none  bg-transparent type-display"
                required
            />
            {error ? <div className="text-red-600 mt-2">{error}</div> : null}
            <div className="flex gap-2 mt-6 w-full items-end justify-end">
                <button type="submit" className="cta-button text-black">
                    Next
                </button>
            </div>
        </form>
    );
}
