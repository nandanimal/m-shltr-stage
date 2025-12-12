"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";
import FadeIn from "./FadeIn";

export default function TopdownMobile() {
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
    }, []);

    // track scroll progress relative to container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // scale across scroll progress
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 0]);
    const height = useTransform(scrollYProgress, [0.3, 0.7], ["100%", "100%"]);

    // Determine label visibility based on scroll progress
    const labelOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            {/* sticky viewport */}
            <FadeIn>
                <div className="flex items-center flex-col">
                    <div className="font-roboto text-xs">Interiors</div>
                    <h2 className="text-3xl text-center mt-2 mb-8 max-w-[90%]">
                        Thoughtfully considered interiors{" "}
                        <strong>
                            from premium finishes to integrated millwork
                        </strong>
                    </h2>
                </div>
            </FadeIn>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
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

                    {/* MOBILE VERSION */}
                    <motion.div
                        className=" bg-img-container absolute w-full rounded-md p-2 flex items-center"
                        style={{ height }}
                    >
                        <div className="p-2 imageContainer relative">
                            <img
                                ref={imageRef}
                                src="/images/floorplan_updated_rotated.webp"
                                alt="Interior"
                                className="w-full h-auto object-cover rounded-md overflow-hidden transition opacity"
                            />
                            <motion.div
                                style={{ opacity: labelOpacity }}
                                className="absolute w-full top-0 h-full text-white flex flex-col gap-1 text-sm leading-none z-[120] transition"
                            >
                                <Tooltip
                                    textBody={"Custom king bed and headboard"}
                                    leftPct={80} //
                                    bottomPct={80}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={"White oak couch"}
                                    leftPct={58} //
                                    bottomPct={25}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={"Barnstyle doors"}
                                    leftPct={20} //
                                    bottomPct={85}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={
                                        '3-burner Pitt stove top;  Fisher & Paykel 30" electric stove'
                                    }
                                    leftPct={44} //
                                    bottomPct={50}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={
                                        'Standard 24" dishwasher with white oak facade'
                                    }
                                    leftPct={34} //
                                    bottomPct={62}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={
                                        'Spa ensuite with a 63" × 56" shower and soaking tub. Optional steam shower upgrade.'
                                    }
                                    leftPct={25} //
                                    bottomPct={5}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                                <Tooltip
                                    textBody={
                                        "Built-in wardrobe with 11' × 8' × 2' of total space"
                                    }
                                    leftPct={55} //
                                    bottomPct={86}
                                    imgWidth={imgDims.width}
                                    imgHeight={imgDims.height}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
