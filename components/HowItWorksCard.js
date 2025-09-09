import React from "react";
import { motion } from "framer-motion";

const HowItWorksCard = ({ step, title, desc, iconSrc, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { duration: 1, delay: delay || 0 },
            }}
            className="aspect-square bg-[#DADAD6] text-sm text-black uppercase rounded-md p-4 flex flex-col justify-start"
        >
            <div className="top-label font-mono">STEP {step}</div>
            <div className="info flex flex-col gap-3 sm:h-full pt-[15%]">
                <img src={iconSrc} className="w-[24px]" />
                <div className="font-mono md:text-[16px] text-xl leading-none">
                    {title}
                </div>
                <div className="font-mono text-xs leading-none mt-3">
                    {desc}
                </div>
            </div>
        </motion.div>
    );
};

export default HowItWorksCard;
