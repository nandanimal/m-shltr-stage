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

const ExteriorTrims = () => {
    return (
        <div className="p-2">
            <h2 className="sm:text-4xl lg:text-6xl text-3xl  mb-8 text-pretty ">
                Exterior trims and finishes
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 auto-rows-fr">
                <Card
                    title={"Midnight trim"}
                    desc={
                        "Shou-Sugi Ban charred siding treated with a linseed oil finish for a matte dark siding finish. "
                    }
                    url={"/images/midnight.avif"}
                />
                <Card
                    title={"Steel Trim"}
                    desc={
                        "4x8 Panels of steel siding panels for horizontal and vertical surfaces."
                    }
                    url={"/images/steel.jpg"}
                />
                <Card
                    title={"Daylight Trim"}
                    desc={
                        "Light wood trim siding, factory-sealed for durable roofing and exterior finish."
                    }
                    url={"/images/daylight.avif"}
                />
                <Card
                    title={"Plaster Trim"}
                    desc={
                        "Medium fine grain plaster finish in a pallet of neutral colors to select from. "
                    }
                    url={"/images/plaster.avif"}
                />
            </div>
        </div>
    );
};

export default ExteriorTrims;
