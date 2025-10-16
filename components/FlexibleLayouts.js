import React from "react";
import ModuleCard from "./ModuleCard";
import CTAButton from "./CTAButton";
import FadeIn from "./FadeIn";

const FlexibleLayouts = () => {
    const modules = [
        {
            title: "ARK",
            src: "/images/models/ARK.webp",
        },
        {
            title: "CBN 16X40",
            src: "/images/models/CBN 16X40.webp",
        },
        {
            title: "CHMBR",
            src: "/images/models/CHMBR.webp",
        },
        {
            title: "CPSL",
            src: "/images/models/CPSL.webp",
        },
        {
            title: "NMD",
            src: "/images/models/NMD.webp",
        },
        {
            title: "NST",
            src: "/images/models/NST.webp",
        },
        {
            title: "PVLN",
            src: "/images/models/PVLN.webp",
        },
        {
            title: "TREK",
            src: "/images/models/TREK.webp",
        },
    ];

    return (
        <FadeIn>
            <section className="min-h-screen py-16 p-2 flex flex-col items-center justify-center">
                <h2 className="text-3xl text-center leading-none mb-2">
                    Flexible layouts that grow with you.
                </h2>
                <div className="font-mono uppercase text-center text-xs">
                    Every module is built to be modular; start with one and
                    connect others as your needs grow
                </div>
                <div className="flex flew-row gap-1 overflow-x-scroll w-full mt-8 pb-3">
                    {modules.map((module, index) => (
                        <ModuleCard
                            title={module.title}
                            src={module.src}
                            key={index}
                        />
                    ))}
                </div>
                <div className="cta-container">
                    <div className="mx-auto mt-8">
                        <CTAButton text="Request Info" />
                    </div>
                </div>
            </section>
        </FadeIn>
    );
};

export default FlexibleLayouts;
