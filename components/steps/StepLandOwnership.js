import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import OptionCard from "@/components/OptionCard";

export default function StepLandOwnership() {
    const { data, update, next, prev } = useCtaFlow();
    const [landOwnership, setLandOwnership] = useState(
        data.landOwnership || ""
    );
    const [landAddress, setLandAddress] = useState(data.landAddress || "");
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        setLandOwnership(data.landOwnership || "");
        setLandAddress(data.landAddress || "");
    }, [data.landOwnership, data.landAddress]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!landOwnership) return;
        update({
            landOwnership,
            landAddress: landOwnership === "Yes" ? landAddress : "",
        });
        next();
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="type-h2 font-dince">
                Do you already own the land for this project?
            </div>

            <div className="mt-8 grid gap-3">
                {["Yes", "No"].map((option) => (
                    <OptionCard
                        key={option}
                        name="landOwnership"
                        value={option}
                        checked={landOwnership === option}
                        onChange={setLandOwnership}
                        onHover={setHovered}
                        dimmed={
                            (hovered && hovered !== option) ||
                            (!hovered &&
                                landOwnership &&
                                landOwnership !== option)
                        }
                    >
                        {option}
                    </OptionCard>
                ))}
            </div>

            <AnimatePresence>
                {landOwnership === "Yes" ? (
                    <motion.div
                        className="mt-6"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                    >
                        <label
                            className="block type-caption"
                            htmlFor="landAddress"
                        >
                            If yes, please provide the address
                        </label>
                        <input
                            id="landAddress"
                            name="landAddress"
                            type="text"
                            value={landAddress}
                            onChange={(e) => setLandAddress(e.target.value)}
                            className="w-full mt-2 p-2 border-b border-black focus:outline-none bg-transparent"
                            required
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>

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
                        !landOwnership ||
                        (landOwnership === "Yes" && !landAddress)
                            ? "opacity-40 pointer-events-none"
                            : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </form>
    );
}
