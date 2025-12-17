"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Simple two-option toggle showcasing two sizes with imagery + details.
export default function SizeToggleCard({ views }) {
    const defaultViews = useMemo(
        () => [
            {
                key: "Size A",
                title: "1174 ft²",
                subtitle: "2 bed / 2.5 bath",
                description:
                    "Full two-bedroom layout with generous storage, spa ensuite, and an open living/kitchen core.",
                image: "/images/cbn_outline.png",
                stats: ["1174 ft²", "2 bed", "2.5 bath"],
            },
            {
                key: "Size B",
                title: "640 ft²",
                subtitle: "2 bed / 2 bath",
                description:
                    "Compact footprint optimized for smaller lots while keeping light-filled living and a full kitchen.",
                image: "/images/models/CPSL.webp",
                stats: ["640 ft²", "1 bed", "1 bath"],
            },
        ],
        []
    );

    const entries = views?.length === 2 ? views : defaultViews;
    const keys = entries.map((v) => v.key);
    const [activeKey, setActiveKey] = useState(keys[0]);
    const active = entries.find((v) => v.key === activeKey) || entries[0];

    if (!entries?.length) return null;

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 my-48">
            <div className="text-center">
                <h2 className="type-h2 tracking-wide mb-8">
                    Available in 2 sizes
                </h2>
            </div>

            <div className="relative w-full overflow-hidden rounded-md aspect-[16/9]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={active.image}
                            alt={active.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/60 border border-white/10 rounded-sm px-1 py-1 backdrop-blur-sm">
                            {entries.map((v) => {
                                const isActive = v.key === activeKey;
                                return (
                                    <button
                                        key={v.key}
                                        onClick={() => setActiveKey(v.key)}
                                        className={`px-3 py-1 rounded-sm type-caption font-medium transition ${
                                            isActive
                                                ? "bg-white text-black"
                                                : "bg-white/10 text-gray hover:bg-white/60 hover:text-black/80 cursor-pointer"
                                        }`}
                                    >
                                        {v.title || v.key}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
