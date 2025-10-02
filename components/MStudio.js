import { React, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import CollageGallery from "./CollageGallery";

const MStudio = () => {
    const studioContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: studioContainerRef,
        offset: ["start start", "end end"],
    });

    const opacity = useTransform(
        scrollYProgress,
        [0.2, 0.3, 0.6, 0.7],
        [0, 1, 1, 0]
    );
    const galleryOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

    return (
        <div
            ref={studioContainerRef}
            className="h-[200vh] relative flex items-center justify-center"
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ opacity }}
                    className="fixed top-0 flex flex-col gap-4 p-2 items-center justify-center center h-[100vh] pointer-events-none"
                >
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            src="/images/tent.png"
                            alt="tent"
                            className="rounded-md w-full max-w-xl"
                        />
                        <h2 className="text-3xl text-center leading-none mt-8 max-w-[95%]">
                            Hero text + accessories laoreet at enim sed and
                            malesuada, laoreet.
                        </h2>
                    </div>
                    <div className="featured-banner flex flex-col gap-4  0 p-4 sm:p-16 items-center justify-center absolute bottom-0">
                        <div className="font-mono w-full uppercase text-gray text-center mb-1 text-xs">
                            SOME TEXT THAT CONTEXTUALIZES M-STUDIO
                        </div>
                        <img
                            src="/images/logos.png"
                            className="w-full max-w-4xl"
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ opacity: galleryOpacity }}
                    className="sticky top-0 "
                >
                    <CollageGallery />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MStudio;
