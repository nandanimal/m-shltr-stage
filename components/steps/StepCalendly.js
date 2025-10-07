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
    const calendlyUrl = `https://calendly.com/fernando-finetooth/30min?hide_event_type_details=1&hide_gdpr_banner=1&${prefillParams}`;

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
        >
            {" "}
            <h2 className="text-xl font-semibold mb-1">Schedule your call</h2>
            <p className="text-gray-600 mb-4">
                We prefilled your info — this should be quick.
            </p>
            <div
                ref={containerRef}
                className="calendly-inline-widget w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden"
                data-url={calendlyUrl}
            />
            <div className="flex gap-2 mt-4">
                <button
                    onClick={prev}
                    className="px-4 py-2 rounded border border-gray-300 bg-gray text-white cursor-pointer"
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
