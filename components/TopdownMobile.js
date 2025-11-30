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

    // Helper to update imageRef values
    const updateImgDims = () => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            setImgDims({
                width: rect.width,
                height: rect.height,
            });
        }
    };

    useEffect(() => {
        // Call at mount
        updateImgDims();

        // Update on resize
        window.addEventListener("resize", updateImgDims);

        // Optionally update on image load as well
        if (imageRef.current) {
            imageRef.current.addEventListener("load", updateImgDims);
        }

        return () => {
            window.removeEventListener("resize", updateImgDims);
            if (imageRef.current) {
                imageRef.current.removeEventListener("load", updateImgDims);
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
                    <div className="font-mono uppercase text-xs">interiors</div>
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
                                src="/images/floorplan_rotated.png"
                                fill={true}
                                alt="Interior"
                                className="object-cover rounded-md overflow-hidden transition opacity"
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
