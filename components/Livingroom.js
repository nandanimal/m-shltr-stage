import React from "react";

const Livingroom = () => {
    return (
        <div className="w-full p-2">
            <div
                className="img-container w-full min-h-[80svh] bg-cover bg-center rounded-sm flex justify-end sm:justify-start flex-col"
                style={{ backgroundImage: 'url("/images/living.jpg")' }}
            >
                <div className="p-8 text-pretty">
                    <div className="md:text-6xl sm:text-3xl text-2xl text-white lg:max-w-[50%] font-dince">
                        Designed to expand with you.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Livingroom;
