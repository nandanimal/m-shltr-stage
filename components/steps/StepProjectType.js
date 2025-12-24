import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const OPTIONS = [
    "Accessory Dwelling Unit (ADU)",
    "Single-Family Home",
    "Hospitality Project",
    "Other",
];

export default function StepProjectType() {
    const { data, update, next, prev } = useCtaFlow();
    const [projectType, setProjectType] = useState(data.projectType || "");

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
                    <label
                        key={option}
                        className={`flex items-center gap-3 border-b border-black/40 pb-3 cursor-pointer transition ${
                            projectType === option ? "text-black" : "text-gray"
                        }`}
                    >
                        <input
                            type="radio"
                            name="projectType"
                            value={option}
                            checked={projectType === option}
                            onChange={() => setProjectType(option)}
                            className="accent-black"
                        />
                        <span className="type-subtitle">{option}</span>
                    </label>
                ))}
            </div>

            <div className="flex gap-2 mt-8 w-full items-end justify-between">
                <button
                    type="button"
                    onClick={prev}
                    className="px-4 py-2 rounded-xs border border-black/40 text-black cursor-pointer"
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
