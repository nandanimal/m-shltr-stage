import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import OptionCard from "@/components/OptionCard";

const OPTIONS = ["1-3 months", "3-6 months", "6-12 months", "1 year +"];

export default function StepProjectTimeline() {
    const { data, update, next, prev } = useCtaFlow();
    const [timeline, setTimeline] = useState(data.timeline || "");
    const [hovered, setHovered] = useState(null);

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
                    <OptionCard
                        key={option}
                        name="timeline"
                        value={option}
                        checked={timeline === option}
                        onChange={setTimeline}
                        onHover={setHovered}
                        dimmed={
                            (hovered && hovered !== option) ||
                            (!hovered && timeline && timeline !== option)
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
                        !timeline ? "opacity-40 pointer-events-none" : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </form>
    );
}
