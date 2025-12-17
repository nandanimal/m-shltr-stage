"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function AttrCard({ items, initialKey }) {
    const keys = useMemo(() => Object.keys(items || {}), [items]);
    const [activeKey, setActiveKey] = useState(
        initialKey && keys.includes(initialKey) ? initialKey : keys[0]
    );

    if (!keys.length) return null;

    return (
        <div className="w-full max-w-5xl rounded-sm shadow-lg relative overflow-hidden">
            {/* Tabs */}
            <div className="p-2 bottom-2 w-full flex items-center justify-center z-10 absolute">
                <div
                    className="navbar w-full  bottom-2  max-w-xl rounded-sm backdrop-blur-md hover:shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition"
                    style={{
                        background: "rgba(242, 242, 238, 0.70)",
                        border: "1px solid #F2F2EE",
                    }}
                >
                    <ul className="flex">
                        {keys.map((k) => {
                            const isActive = k === activeKey;
                            return (
                                <motion.li
                                    key={k}
                                    onClick={() => setActiveKey(k)}
                                    initial={false}
                                    animate={{
                                        backgroundColor: isActive
                                            ? "#ffffff"
                                            : "transparent",
                                    }}
                                    className="relative cursor-pointer select-none type-body-sm font-medium text-neutral-800 flex-1 text-center"
                                >
                                    <span className="truncate">{k}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="attrcard-underline"
                                            className="absolute left-0 right-0 -bottom-px h-[2px] bg-white"
                                        />
                                    )}
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Panel */}
            <div className="relative aspect-[16/9] w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={items[activeKey]}
                            alt={activeKey}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* <div className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-1 text-xs font-medium text-white">
                            {activeKey}
                        </div> */}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
