"use client";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Tooltip from "./Tooltip";

const defaultTooltips = [
    { textBody: "Integrated bed and sofa", leftPct: 22, bottomPct: 25 },
    {
        textBody: "Utility cabinet + tankless water heater",
        leftPct: 32,
        bottomPct: 64,
    },
    {
        textBody:
            "Living and dining areas with built-in seating and twin xl beds",
        leftPct: 38,
        bottomPct: 20,
    },
    {
        textBody: "Sliding glass doors and covered terrace",
        leftPct: 20,
        bottomPct: 75,
    },
    { textBody: "Built-in appliance island", leftPct: 52, bottomPct: 55 },
    {
        textBody: 'Standard 24" dishwasher with white oak facade',
        leftPct: 40,
        bottomPct: 68,
    },
    {
        textBody:
            'Spa ensuite with a 63" × 56" shower and soaking tub. Optional steam shower upgrade.',
        leftPct: 85,
        bottomPct: 68,
    },
    {
        textBody: "Optimized wardrobe and 11' storage wall",
        leftPct: 87,
        bottomPct: 45,
    },
    { textBody: "Separate en-suite toilets / W.C.", leftPct: 8, bottomPct: 18 },
    { textBody: "Laundry", leftPct: 34, bottomPct: 80 },
];

export default function Topdown({
    modelName = "CBN 1172",
    floorplan = "/images/floorplan_updated.webp",
    tooltips = defaultTooltips,
    controls = null,
}) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // Tooltip will now get image dimensions
    const [imgDims, setImgDims] = useState({ width: 0, height: 0 });

    // Helper to update imageRef values using layout (untransformed) size
    const updateImgDims = () => {
        const el = imageRef.current;
        if (!el) return;
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        if (!width || !height) return;
        setImgDims({ width, height });
    };

    // Tooltips were misaligned because we measured before the image decoded (width/height read as 0) and while transforms were settling; we now wait for decode + a frame before measuring and use layout sizes.
    useEffect(() => {
        let cancelled = false;
        const imgEl = imageRef.current;

        const measure = () => {
            if (cancelled) return;
            updateImgDims();
        };

        const measureAfterDecode = async () => {
            if (!imgEl || cancelled) return;
            try {
                if (imgEl.decode) {
                    await imgEl.decode();
                } else if (!imgEl.complete) {
                    await new Promise((resolve) => {
                        imgEl.addEventListener("load", resolve, {
                            once: true,
                        });
                    });
                }
            } catch (_) {
                // decode can reject if the image is already in flight; safe to ignore
            }
            if (cancelled) return;
            // Wait a frame so transforms/scroll-based scaling settle before measuring
            requestAnimationFrame(measure);
        };

        // Resize observer picks up layout shifts without a full window resize
        const resizeObserver =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(measure)
                : null;
        if (resizeObserver && imgEl) {
            resizeObserver.observe(imgEl);
        }

        // Run once after decode instead of on mount to avoid zero-sized reads
        measureAfterDecode();

        // Update on resize and when the image loads
        window.addEventListener("resize", measure);
        window.addEventListener("load", measureAfterDecode);

        if (imgEl) {
            imgEl.addEventListener("load", measureAfterDecode);
        }

        return () => {
            cancelled = true;
            window.removeEventListener("resize", measure);
            window.removeEventListener("load", measureAfterDecode);
            if (imgEl) {
                imgEl.removeEventListener("load", measureAfterDecode);
            }
            if (resizeObserver && imgEl) {
                resizeObserver.disconnect();
            }
        };
        // Note: if you expect the image to ever change, you could include src as a dependency
    }, [floorplan]);

    // track scroll progress relative to container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // scale across scroll progress
    const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 0]);
    const height = useTransform(scrollYProgress, [0.3, 0.7], ["100%", "100%"]);

    // Determine label visibility based on scroll progress
    const labelOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

    const tooltipItems = Array.isArray(tooltips)
        ? tooltips
        : tooltips?.items || [];
    const eyebrowText = modelName ? `Interiors — ${modelName}` : "Interiors";

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            {/* sticky viewport */}

            <div className="flex items-center flex-col">
                <div className="type-eyebrow text-gray">{eyebrowText}</div>
                <h2 className="type-display text-center mt-4 mb-8 max-w-[90%] header-text">
                    Thoughtfully considered interiors{" "}
                    <strong>
                        from premium finishes to integrated millwork
                    </strong>
                </h2>
            </div>
            <div
                className="sticky top-0 h-screen flex flex-col items-center justify-center"
                data-nav-theme="light"
            >
                <motion.div
                    style={{ scale }}
                    className="flex items-center justify-center w-full h-screen relative "
                >
                    <motion.div
                        style={{ opacity }}
                        className="fg-img-container w-full h-auto absolute z-10 "
                    >
                        {/* <Image
                            src="/images/facade.svg"
                            fill={true}
                            priority
                            alt="Facade"
                            className="object-contain p-2  "
                        /> */}
                    </motion.div>

                    {/* DESKTOP VERSION */}
                    <motion.div
                        className="bg-img-container absolute w-full rounded-md p-2 flex items-center"
                        style={{ height }}
                    >
                        <div className="p-2 flex flex-col items-center gap-6">
                            <div className="w-full" style={{ display: "grid" }}>
                            <AnimatePresence>
                                <motion.div
                                    key={floorplan}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="imageContainer relative pt-24"
                                    style={{ gridArea: "1 / 1" }}
                                >
                                    <img
                                        ref={imageRef}
                                        src={floorplan}
                                        alt={`${modelName} floorplan`}
                                        className="w-full h-auto object-cover rounded-md overflow-hidden transition opacity"
                                    />
                                    <motion.div
                                        style={{ opacity: labelOpacity }}
                                        className="absolute w-full top-0 h-full text-white flex flex-col gap-1 type-body-sm leading-none z-[120] transition"
                                    >
                                        {tooltipItems.map((tip, index) => (
                                            <Tooltip
                                                key={`${
                                                    tip.textBody || tip.text
                                                }-${index}`}
                                                textBody={
                                                    tip.textBody ||
                                                    tip.text ||
                                                    ""
                                                }
                                                leftPct={tip.leftPct}
                                                bottomPct={tip.bottomPct}
                                                imgWidth={imgDims.width}
                                                imgHeight={imgDims.height}
                                            />
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                            </div>
                            {controls ? (
                                <div className="flex flex-col items-center gap-3">
                                    {controls}
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
