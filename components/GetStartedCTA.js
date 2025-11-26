"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const GetStartedCTA = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            className="sm:aspect-square aspect-[16/9] leading-none text-3xl text-white font-dince cursor-pointer rounded-md flex flex-col justify-end bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage: 'url("/images/4.jpeg")',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex flex-row w-full gap-4 items-center px-4 py-2 z-30 ">
                <span>Get started</span>
                <div className="">
                    <img
                        src="/icons/arrow-up-right-white.svg"
                        className="max-w-[20px] aspect-square text-white"
                    />
                </div>
            </div>
            <div
                className="absolute w-full h-full z-10"
                style={{
                    backgroundImage:
                        "linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
                }}
            ></div>
            <motion.div
                animate={{ height: hovered ? "100%" : "0%", opacity: 100 }}
                initial={{ height: "0%", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                }}
                className="absolute w-full h-full z-20 bg-gray"
            ></motion.div>
        </a>
    );
};

export default GetStartedCTA;
