import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const OPTIONS = ["1-3 months", "3-6 months", "6-12 months", "1 year +"];

export default function StepProjectTimeline() {
    const { data, update, next, prev } = useCtaFlow();
    const [timeline, setTimeline] = useState(data.timeline || "");

    useEffect(() => {
        setTimeline(data.timeline || "");
    }, [data.timeline]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!timeline) return;
        update({ timeline });
        next();
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="type-h2 font-dince">
                When are you hoping to begin your project?
            </div>

            <div className="mt-8 grid gap-3">
                {OPTIONS.map((option) => (
                    <label
                        key={option}
                        className={`flex items-center gap-3 border-b border-black/40 pb-3 cursor-pointer transition ${
                            timeline === option ? "text-black" : "text-gray"
                        }`}
                    >
                        <input
                            type="radio"
                            name="timeline"
                            value={option}
                            checked={timeline === option}
                            onChange={() => setTimeline(option)}
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
                        !timeline ? "opacity-40 pointer-events-none" : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </form>
    );
}
