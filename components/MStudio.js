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
        [0, 0.1, 0.6, 0.7],
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
                            Award winning design made easy.
                        </h2>
                    </div>
                    <div className="featured-banner flex flex-col gap-4  0 p-4 sm:p-16 items-center justify-center absolute bottom-0">
                        <div className="font-mono w-full uppercase text-gray text-center mb-1 text-xs">
                            FEATURED IN
                        </div>
                        <div className="press-row w-full gap-8 flex-row flex items-center justify-center">
                            <img
                                src="/images/press-logos/cn.svg"
                                alt="Conde Nast"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/ad.svg"
                                alt="Architectural Digest"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/dez.svg"
                                alt="Dezeen"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/gq.svg"
                                alt="GQ"
                                className="h-[32px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ opacity: galleryOpacity }}
                    className="sticky top-0 min-h-screen flex items-center justify-center "
                >
                    <CollageGallery />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MStudio;
