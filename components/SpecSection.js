"use client";

import * as React from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function SpecSection() {
    const items = [
        {
            title: "Interior finishes",
            lines: [
                "0x RUSTED STEEL PANELS",
                "THERMOWOOD CLADDING",
                "STAINED CEDAR SHINGLES",
                "SHOU SUGI BAN CLADDING",
            ],
        },
        {
            title: "Bathroom accessories",
            lines: [
                "0x RUSTED STEEL PANELS",
                "THERMOWOOD CLADDING",
                "STAINED CEDAR SHINGLES",
                "SHOU SUGI BAN CLADDING",
            ],
        },
        {
            title: "General accessories",
            lines: [
                "0x RUSTED STEEL PANELS",
                "THERMOWOOD CLADDING",
                "STAINED CEDAR SHINGLES",
                "SHOU SUGI BAN CLADDING",
            ],
        },
        {
            title: "Supporting elements",
            lines: [
                "0x RUSTED STEEL PANELS",
                "THERMOWOOD CLADDING",
                "STAINED CEDAR SHINGLES",
                "SHOU SUGI BAN CLADDING",
            ],
        },
    ];

    const [openIndex, setOpenIndex] = React.useState(-1);

    return (
        <section className="flex items-center justify-center mt-48 flex-col">
            <div className="w-full  divide-y divide-neutral-300 text-black">
                {items.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div key={item.title} className="select-none">
                            {/* Header row */}
                            <button
                                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                className="w-full flex py-1 px-2 items-center gap-3  text-left cursor-pointer hover:bg-black/2"
                            >
                                <span className="text-3xl md:text-6xl  leading-none font-light tracking-wide flex-1">
                                    {item.title}
                                </span>
                                <span className="text-xl w-6 text-right">
                                    {isOpen ? "–" : "+"}
                                </span>
                            </button>

                            {/* Animated body */}
                            <AnimatePresence initial={false}>
                                {isOpen && item.lines?.length > 0 && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            ease: "easeInOut",
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="">
                                            <ul className="space-y-1 pt-1 pb-2 px-2 font-mono text-sm tracking-wider text-neutral-800">
                                                {item.lines.map((line) => (
                                                    <li key={line}>{line}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
            <div className="text-3xl py-1 border-t border-neutral-300 px-2 md:text-6xl text-black w-full leading-none font-light tracking-wide flex-1">
                Residence & models
            </div>
            <div className="w-full h-auto aspect-[16/9] relative">
                <img
                    className="w-full object-cover"
                    src="/images/outline.png"
                    fill={true}
                    alt="Outline of M-SHLTR CBN"
                    quality={95}
                    priority
                />
            </div>
            {/* <div className="w-full py-1 px-2 text-3xl md:text-6xl leading-none">
                Phasellus laoreet at enim sed malesuada, laoreet at enim sed
                malesuada.{" "}
            </div> */}
            {/* Models */}
        </section>
    );
}
