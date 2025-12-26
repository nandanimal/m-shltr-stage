import { useEffect, useRef } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import { motion } from "framer-motion";

export default function StepCalendly() {
    const { data, prev, closeCta } = useCtaFlow();
    const containerRef = useRef(null);

    useEffect(() => {
        // Inject Calendly widget script once
        if (!document.getElementById("calendly-script")) {
            const script = document.createElement("script");
            script.id = "calendly-script";
            script.src =
                "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const prefillParams = new URLSearchParams({
        name: data?.name || "",
        email: data?.email || "",
    }).toString();

    // Your real scheduling link with prefill + hidden details
    const calendlyUrl = `https://calendly.com/gordy-mshltr/30min?hide_event_type_details=1&hide_gdpr_banner=1&${prefillParams}`;

    return (
        <motion.div className="w-full h-full min-h-0 flex flex-col">
            <div
                ref={containerRef}
                className="calendly-inline-widget w-full flex-1 min-h-0 rounded-lg overflow-hidden mt-6 sm:mt-0"
                data-url={calendlyUrl}
                style={{ height: "100%" }}
            />
            <div className="flex gap-2 mt-4">
                <button
                    onClick={prev}
                    className="back-button font-mono uppercase h-full"
                >
                    Back
                </button>
                {/* <button
                    onClick={closeCta}
                    className="px-4 py-2 rounded border border-gray-900 bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                    Exit
                </button> */}
            </div>
        </motion.div>
    );
}
