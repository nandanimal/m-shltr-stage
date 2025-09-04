"use client";
import { useState, React } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalCTA = ({ toggleHandler }) => {
    const [formIndex, setFormIndex] = useState(0);

    const updateIndex = (increment) => {
        setFormIndex((prev) => prev + increment);
    };

    return (
        <>
            <motion.div
                exit={{ opacity: 0 }}
                className="w-full h-full p-4 flex items-center justify-center fixed z-100 top-0 bg-black/50 overscroll-none"
            >
                <div
                    className="modal-itself max-w-6xl w-full h-fit flex flex-col items-center rounded-sm backdrop-blur-sm"
                    style={{ background: "rgba(216, 216, 216, 0.90)" }}
                >
                    {/* Header row */}
                    <div className="header-row w-full h-4 p-1 flex flex-row items-center leading-none text-xs justify-between">
                        <div
                            onClick={toggleHandler}
                            className="bg-orange-600 hover:bg-red-500 cursor-pointer transition rounded-xs w-[36px] h-full"
                        ></div>
                        <div className="font-mono uppercase">
                            let's get started
                        </div>
                    </div>

                    {/* Form info */}
                    <form className="px-1 pt-4 pb-1 w-full">
                        <AnimatePresence>
                            {formIndex == 0 && (
                                <div
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col gap-1 text-2xl"
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="What's your name?"
                                        className="placeholder:text-gray border-b-1 border-gray focus:outline-none w-full"
                                    ></input>
                                </div>
                            )}

                            {formIndex == 1 && (
                                <div
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col gap-1 text-2xl"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="What's your email?"
                                        className="placeholder:text-gray border-b-1 border-gray focus:outline-none w-full"
                                    ></input>
                                </div>
                            )}
                        </AnimatePresence>
                        <div className="nav-row w-full flex flex-row justify-between mt-2">
                            <div
                                onClick={() => updateIndex(-1)}
                                className={`bg-gray text-white px-4 mono hover:bg-gray-200  transition rounded-xs w-fit px-1 h-full ${
                                    formIndex == 0
                                        ? "opacity-20 pointer-events-none cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                BACK
                            </div>
                            <div
                                onClick={() => updateIndex(1)}
                                className={`bg-blue text-white px-4 mono hover:bg-gray-200  transition rounded-xs w-fit px-1 h-full ${
                                    formIndex == 10
                                        ? "opacity-20 pointer-events-none cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                NEXT
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
};

export default ModalCTA;
