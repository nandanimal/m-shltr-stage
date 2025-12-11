import React from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const CTAMinimal = ({ text, source, width }) => {
    const { openCta } = useCtaFlow();

    // If width is given, use it as a width class (e.g., 'w-full', 'w-auto')
    const widthClass = width ? width : "";

    return (
        <div className={widthClass}>
            <div
                onClick={openCta}
                className="order-now flex uppercase flex-row gap-2 cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition font-mono"
            >
                {text || "PRE-ORDER"}
                <img className="" src="/icons/arrow-up-right.svg" />
            </div>
        </div>
    );
};

export default CTAMinimal;
