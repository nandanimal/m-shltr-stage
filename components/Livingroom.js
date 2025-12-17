import React from "react";

const Livingroom = () => {
    return (
        <div className="w-full modern-padding">
            <div
                className="img-container w-full min-h-[100svh] bg-cover bg-center rounded-sm flex justify-end sm:justify-start flex-col"
                style={{ backgroundImage: 'url("/images/living.jpg")' }}
            >
                <div className="p-4 text-pretty">
                    <div className="type-display-soft text-white lg:max-w-[50%] font-dince header-text text-pretty">
                        Designed to expand with you.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Livingroom;
