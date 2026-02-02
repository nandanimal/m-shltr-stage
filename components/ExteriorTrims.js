import React from "react";

const Card = ({ title, desc, url }) => {
    return (
        <div className="flex flex-col gap-4  h-full">
            <div className="flex flex-col gap-2">
                <div className="title type-subtitle">{title}</div>
                <div className="type-mono-xs uppercase">{desc}</div>
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
        <div className="modern-padding">
            <div className="mb-8 space-y-4">
                <h2 className="type-display  text-pretty">
                    Exterior trims and finishes
                </h2>
                <div className="text-body">
                    Exterior finishes are selected for longevity, low
                    maintenance, and wildfire‑aware detailing.
                </div>
            </div>
            <div
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 auto-rows-fr"
                data-nav-theme="dark"
            >
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
            <div className="my-8 space-y-4">
                <div className="font-mono text-sm uppercase">
                    Fire resilient by design
                </div>
                <div className="text-body">
                    Light‑gauge steel framing, integrated interior and exterior
                    sprinklers, pre‑burned cladding options, ember‑resistant
                    venting, and carefully detailed exterior assemblies designed
                    for wildfire regions.
                </div>
            </div>
        </div>
    );
};

export default ExteriorTrims;
