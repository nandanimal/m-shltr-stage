import { useEffect, useRef } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

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
            <h2 className="m-0">Schedule your call</h2>
            <p className="text-gray-600">
                We prefilled your info so this should be quick.
            </p>

            <div
                ref={containerRef}
                className="calendly-inline-widget min-w-[320px] h-[640px] border border-gray-200 rounded-lg overflow-hidden"
                data-url={calendlyUrl}
            />

            <div className="flex gap-2 mt-3">
                <button
                    onClick={prev}
                    className="px-4 py-2 rounded border border-gray-900 bg-gray-200 text-gray-900"
                >
                    Back
                </button>
                <button
                    onClick={closeCta}
                    className="px-4 py-2 rounded border border-gray-900 bg-gray-900 text-white"
                >
                    Done
                </button>
            </div>
        </div>
    );
}
