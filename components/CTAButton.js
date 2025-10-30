import React from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const CTAButton = ({ text, source }) => {
    const { openCta } = useCtaFlow();

    return (
        <div>
            <div
                onClick={() =>
                    openCta({ source: `${source || "source not set"}` })
                }
                className="cta-button uppercase z-20 font-mono"
            >
                {text || "Order now"}
            </div>
        </div>
    );
};

export default CTAButton;
