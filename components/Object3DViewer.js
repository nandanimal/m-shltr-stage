import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Object3DViewer() {
    const TOTAL_FRAMES = 100;
    const BASE_PATH = "/images/CBN3D/";
    const BASE_NAME = "CBN"; // Filenames: CBN1.webp, CBN2.webp...
    const EXT = ".webp";
    const INITIAL_FRAME = 20;

    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(INITIAL_FRAME);
    const [loaded, setLoaded] = useState(false);

    // interval id for press-and-hold
    const [intervalId, setIntervalId] = useState(null);

    // FUNCTIONS FOR PRESS-AND-HOLD ROTATION -----------------------
    const startHoldRotate = (direction) => {
        // Prevent stacking multiple intervals
        if (intervalId) return;

        const id = setInterval(() => {
            if (direction === "next") rotateNext();
            if (direction === "prev") rotatePrev();
        }, 60); // rotation speed (ms per frame)

        setIntervalId(id);
    };

    const stopHoldRotate = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    // ----------------------------------------------------------------

    // Preload frames
    useEffect(() => {
        let loadedCount = 0;
        const temp = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const path = `${BASE_PATH}${BASE_NAME}${i}${EXT}`;
            const img = new Image();
            img.src = path;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setLoaded(true);
                }
            };

            img.onerror = () => {
                console.log("Error loading:", path);
            };

            temp.push(path);
        }

        setImages(temp);
    }, []);

    const rotateNext = useCallback(() => {
        setCurrentIndex((i) => (i + 1) % TOTAL_FRAMES);
    }, []);

    const rotatePrev = useCallback(() => {
        setCurrentIndex((i) => (i - 1 + TOTAL_FRAMES) % TOTAL_FRAMES);
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {/* Skeleton Loader */}
            <AnimatePresence>
                {!loaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full bg-[#e4e4e4] rounded-md animate-pulse"
                    >
                        <p className="p-4 text-center text-xs">
                            Loading 3D frames...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Viewer */}
            {loaded && (
                <motion.img
                    key={images[currentIndex]}
                    src={images[currentIndex]}
                    alt="3D frame"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full object-contain select-none pointer-events-none"
                />
            )}

            {/* Controls */}
            {loaded && (
                <div className="flex gap-4">
                    {/* ROTATE LEFT BUTTON */}
                    <button
                        onMouseDown={() => startHoldRotate("prev")}
                        onMouseUp={stopHoldRotate}
                        onMouseLeave={stopHoldRotate}
                        onTouchStart={() => startHoldRotate("prev")}
                        onTouchEnd={stopHoldRotate}
                        onClick={rotatePrev}
                        className="px-8 py-1 bg-gray/10 text-white rounded-md cursor-pointer hover:opacity-60 transition border-[#fff] "
                    >
                        <img src="/icons/rotate-ccw.svg" className="w-[16px]" />
                    </button>

                    {/* ROTATE RIGHT BUTTON */}
                    <button
                        onMouseDown={() => startHoldRotate("next")}
                        onMouseUp={stopHoldRotate}
                        onMouseLeave={stopHoldRotate}
                        onTouchStart={() => startHoldRotate("next")}
                        onTouchEnd={stopHoldRotate}
                        onClick={rotateNext}
                        className="px-8 py-1 bg-gray/10 text-white rounded-md cursor-pointer hover:opacity-60 transition border-[#fff] "
                    >
                        <img src="/icons/rotate-cw.svg" className="w-[16px]" />
                    </button>
                </div>
            )}
        </div>
    );
}
