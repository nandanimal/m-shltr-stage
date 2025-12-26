import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import OptionCard from "@/components/OptionCard";

const OPTIONS = [
    "Accessory Dwelling Unit (ADU)",
    "Single-Family Home",
    "Hospitality Project",
    "Other",
];

export default function StepProjectType() {
    const { data, update, next, prev } = useCtaFlow();
    const [projectType, setProjectType] = useState(data.projectType || "");
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        setProjectType(data.projectType || "");
    }, [data.projectType]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!projectType) return;
        update({ projectType });
        next();
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="type-h2 font-dince">
                What are you planning to build?
            </div>

            <div className="mt-8 grid gap-3">
                {OPTIONS.map((option) => (
                    <OptionCard
                        key={option}
                        name="projectType"
                        value={option}
                        checked={projectType === option}
                        onChange={setProjectType}
                        onHover={setHovered}
                        dimmed={
                            (hovered && hovered !== option) ||
                            (!hovered && projectType && projectType !== option)
                        }
                    >
                        {option}
                    </OptionCard>
                ))}
            </div>

            <div className="flex gap-2 mt-8 w-full items-center justify-between">
                <button
                    type="button"
                    onClick={prev}
                    className="back-button font-mono uppercase h-full"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className={`cta-button text-black ${
                        !projectType ? "opacity-40 pointer-events-none" : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </form>
    );
}
