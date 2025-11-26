import { React, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HowItWorksCard = ({ step, title, desc, iconSrc, delay, chips }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 1, delay: delay || 0 },
            }}
            className="sm:aspect-square bg-[#DADAD6] hover:bg-[#deded8] transition text-sm text-black rounded-md p-4 flex flex-col justify-between"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="top-label font-mono">STEP {step}</div>
            <div className="info flex flex-col gap-3 mt-8 sm:mt-0">
                <img src={iconSrc} className="w-[24px]" />
                <div className=" xl:text-2xl md:text-xl text-xl leading-none">
                    {title}
                </div>
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="font-mono xl:text-sm text-xs sm:text-xs leading-none overflow-hidden"
                        >
                            {desc}
                            {chips && Array.isArray(chips) ? (
                                <div className="flex flex-wrap gap-1 mt-4">
                                    {chips.map((chip, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-block bg-gray-200 rounded-sm px-2 py-0.5 text-[10px]  font-mono text-gray-700"
                                        >
                                            {chip}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default HowItWorksCard;
