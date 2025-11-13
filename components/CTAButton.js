import React from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const CTAButton = ({ text, source, width }) => {
    const { openCta } = useCtaFlow();

    // If width is given, use it as a width class (e.g., 'w-full', 'w-auto')
    const widthClass = width ? width : "";

    return (
        <div>
            <div
                onClick={() =>
                    openCta({ source: `${source || "source not set"}` })
                }
                className={`cta-button uppercase z-20 font-mono ${widthClass}`}
            >
                {text || "Order now"}
            </div>
        </div>
    );
};

export default CTAButton;
