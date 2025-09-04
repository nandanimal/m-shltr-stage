import React from "react";
import { motion } from "framer-motion";

const ModelDetail = ({
    toggleHandler,
    model,
    bb,
    sqFt,
    mainImgSrc,
    outlineImgSrc,
    description,
}) => {
    return (
        <>
            <motion.div
                exit={{ opacity: 0 }}
                className="w-full h-screen p-2 flex items-center justify-center fixed z-100 top-0 bg-black/50 overscroll-none"
            >
                <div
                    className="modal-itself max-w-6xl w-full h-full flex flex-col items-center rounded-sm backdrop-blur-sm"
                    style={{ background: "rgba(216, 216, 216, 0.90)" }}
                >
                    <div
                        className="header-row w-full h-4 p-1 flex flex-row items-center leading-none text-xs justify-between
            "
                    >
                        <div
                            onClick={toggleHandler}
                            className="bg-orange-600 hover:bg-red-500 cursor-pointer transition rounded-xs w-[36px] h-full"
                        ></div>
                        /\\ {model || "CBN"}
                    </div>

                    <div
                        className="img-container w-full h-full p-1 relative bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${mainImgSrc})`,
                        }}
                    ></div>
                    {/* Details row */}
                    <div className="modal-details-row p-1 flex w-full items-start md:gap-4 gap-1 md:flex-row flex-col min-h-[30%] justify-between">
                        {/* LEFT — don't shrink */}
                        <div className="flex-none shrink-0 z-30 whitespace-nowrap text-black flex flex-col gap-1 text-sm leading-none">
                            <span>
                                <strong>{model}</strong>
                            </span>
                            <span>{bb}</span>
                            <span className="text-xs">
                                {sqFt}
                                <sup>2</sup> ft
                            </span>
                        </div>

                        {/* CENTER — the only one allowed to shrink */}
                        <div
                            className="flex-auto min-w-0 aspect-video bg-contain bg-center bg-no-repeat hidden md:block"
                            style={{ backgroundImage: `url(${outlineImgSrc})` }}
                        />

                        {/* RIGHT — don't shrink (keeps a readable column) */}
                        <div className="flex-none shrink-0 leading-none mono text-black max-w-xl">
                            {description}
                        </div>
                    </div>

                    {/* Nav row */}
                    <div className="nav-row w-full flex flex-row justify-between mt-8 p-1">
                        <div className="bg-gray text-white px-4 mono hover:bg-gray-200 cursor-pointer transition rounded-xs w-fit px-1 h-full">
                            BACK
                        </div>
                        <div className="bg-gray text-white mono px-4 hover:bg-gray-200 cursor-pointer transition rounded-xs w-fit px-1 h-full">
                            NEXT
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ModelDetail;
