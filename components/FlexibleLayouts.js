import React from "react";
import ModuleCard from "./ModuleCard";
import CTAButton from "./CTAButton";
import FadeIn from "./FadeIn";
import CircularGallery from "./CircularGallery";

const FlexibleLayouts = () => {
    const modules = [
        {
            text: "ARK",
            image: "/images/models/ARK.webp",
        },
        {
            text: "CBN 16X40",
            image: "/images/models/CBN 16X40.webp",
        },
        {
            text: "CHMBR",
            image: "/images/models/CHMBR.webp",
        },
        {
            text: "CPSL",
            image: "/images/models/CPSL.webp",
        },
        {
            text: "NMD",
            image: "/images/models/NMD.webp",
        },
        {
            text: "NST",
            image: "/images/models/NST.webp",
        },
        {
            text: "PVLN",
            image: "/images/models/PVLN.webp",
        },
        {
            text: "TREK",
            image: "/images/models/TREK.webp",
        },
    ];

    return (
        <FadeIn>
            <section className="min-h-screen py-16 flex flex-col items-center justify-center">
                <h2 className="text-3xl text-center leading-none mb-2 px-2">
                    Flexible layouts that grow with you.
                </h2>
                <div className="font-mono uppercase text-center text-xs px-2 mb-8">
                    Every module is built to be modular; start with one and
                    connect others as your needs grow
                </div>

                <CircularGallery
                    items={modules}
                    bend={0}
                    textColor={"#000"}
                    scrollEase={0.2}
                />
                {/* <div className="flex flew-row gap-1 overflow-x-scroll w-full mt-8 pb-3">
                    {modules.map((module, index) => (
                        <ModuleCard
                            text={module.text}
                            image={module.image}
                            key={index}
                        />
                    ))}
                </div> */}
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
