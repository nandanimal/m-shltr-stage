import React from "react";

const Card = ({ title, desc, url }) => {
    return (
        <div className="flex flex-col gap-4  h-full">
            <div className="flex flex-col gap-2">
                <div className="title text-xl">{title}</div>
                <div className="font-mono text-xs uppercase">{desc}</div>
            </div>
            <img
                src={url}
                alt={title}
                className="aspect-square rounded-sm object-cover mt-auto"
            />
        </div>
    );
};

const InteriorTrims = () => {
    return (
        <div className="p-2">
            <h2 className="sm:text-4xl lg:text-6xl text-3xl sm:mt-24 mb-8 text-pretty ">
                Interior trims and finishes
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 auto-rows-fr ">
                <Card
                    title={"Midnight Stone"}
                    desc={
                        "Natural stone features a dark base with veining in a matte finish."
                    }
                    url={"/images/midnight.jpg"}
                />
                <Card
                    title={"Daylight Stone"}
                    desc={
                        "Natural honed finis creme colored stone for a brighter lighter trim finish. "
                    }
                    url={"/images/daylight.jpg"}
                />
                <Card
                    title={"Plaster Finish"}
                    desc={
                        "Plaster finish for dry and wet areas of the module for a continuous and seamless finish"
                    }
                    url={"/images/plaster.jpg"}
                />
                <Card
                    title={"Oak Millwork"}
                    desc={
                        "Custom Oak finish cabinets and millwork integrated into the overall modular design. "
                    }
                    url={"/images/millwork.jpg"}
                />
            </div>
        </div>
    );
};

export default InteriorTrims;
