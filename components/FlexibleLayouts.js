import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import ModuleCard from "./ModuleCard";
import CTAButton from "./CTAButton";
import FadeIn from "./FadeIn";
import TickerFM from "./TickerFM";
import { motion, useAnimationFrame } from "framer-motion";

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

    const tickerRef = useRef(null);
    const [tickerWidth, setTickerWidth] = useState(0);
    const [overlayOpen, setOverlayOpen] = useState(false);

    const toggleOverlay = () => {
        setOverlayOpen(!overlayOpen);
    };

    // This is the measurement step we previously had
    useLayoutEffect(() => {
        if (tickerRef.current) {
            setTickerWidth(tickerRef.current.scrollWidth / 2);
        }
    }, [modules]);

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => {
            if (tickerRef.current) {
                setTickerWidth(tickerRef.current.scrollWidth / 2);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Infinite horizontal animation loop using framer-motion's useAnimationFrame
    const [x, setX] = useState(0);
    const speed = 60; // px per second

    useAnimationFrame((t, delta) => {
        if (tickerWidth > 0) {
            setX((prev) => {
                let next = prev - (speed * delta) / 1000;
                if (next <= -tickerWidth) next += tickerWidth;
                return next;
            });
        }
    });

    // Duplicate the images so it can scroll seamlessly
    return (
        <FadeIn>
            <section
                className="min-h-screen overflow-hidden py-16 flex flex-col items-center justify-center relative"
                data-theme="dark"
            >
                <div className="type-eyebrow-lg w-full text-center mb-3">
                    coming soon{" "}
                </div>{" "}
                <h2 className="type-h2 text-center mb-2 px-2">
                    Flexible layouts that grow with you.
                </h2>
                <div
                    className="track w-full"
                    style={{ willChange: "transform", overflow: "hidden" }}
                >
                    <motion.div
                        className="ticker flex flex-row gap-2 items-center justify-start"
                        ref={tickerRef}
                        style={{
                            x,
                        }}
                    >
                        {/* duplicate for seamless loop */}
                        {[...modules, ...modules].map((module, idx) => (
                            <img
                                key={idx}
                                className=" max-w-xl "
                                src={module.image}
                                alt={module.text}
                                style={{ flexGrow: 0, flexShrink: 0 }}
                            />
                        ))}
                    </motion.div>
                </div>
                {/* Full screen overlay */}
                {/* <FadeIn>
                    <motion.div
                        className="aspect-[16/9]  absolute bottom-0 left-0 p-2 cursor-pointer "
                        style={{
                            width: overlayOpen ? "100vw" : 96,
                            zIndex: 10,
                        }}
                        whileHover={!overlayOpen ? { width: 144 } : {}}
                        transition={{ type: "tween", duration: 0.25 }}
                        onClick={toggleOverlay}
                    >
                        <div
                            className="bg-cover w-full h-full rounded-sm"
                            style={{
                                backgroundImage: "url(/images/fall_hero.webp)",
                            }}
                        >
                            {overlayOpen && (
                                <button
                                    className="bg-orange-600  h-auto hover:bg-red-500 cursor-pointer transition rounded-xs w-[36px] h-auto"
                                    onClick={toggleOverlay}
                                    aria-label="Close"
                                    style={{
                                        color: "rgba(255, 196, 157, 0.8)",
                                    }}
                                >
                                    ×
                                </button>
                            )}

                            {!overlayOpen && (
                                <div className="text-3xl text-white w-full h-full flex items-center justify-center">
                                    +
                                </div>
                            )}
                        </div>
                    </motion.div>
                </FadeIn> */}
            </section>
        </FadeIn>
    );
};

export default FlexibleLayouts;
