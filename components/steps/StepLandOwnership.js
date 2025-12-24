import { useEffect, useState } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

export default function StepLandOwnership() {
    const { data, update, next, prev } = useCtaFlow();
    const [landOwnership, setLandOwnership] = useState(
        data.landOwnership || ""
    );
    const [landAddress, setLandAddress] = useState(data.landAddress || "");

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
                    <label
                        key={option}
                        className={`flex items-center gap-3 border-b border-black/40 pb-3 cursor-pointer transition ${
                            landOwnership === option ? "text-black" : "text-gray"
                        }`}
                    >
                        <input
                            type="radio"
                            name="landOwnership"
                            value={option}
                            checked={landOwnership === option}
                            onChange={() => setLandOwnership(option)}
                            className="accent-black"
                        />
                        <span className="type-subtitle">{option}</span>
                    </label>
                ))}
            </div>

            {landOwnership === "Yes" ? (
                <div className="mt-6">
                    <label className="block type-caption" htmlFor="landAddress">
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
                </div>
            ) : null}

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
