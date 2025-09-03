import React from "react";
import Image from "next/image";

const RenderCard = ({ src, desc }) => {
    return (
        <div className="card flex flex-col flex-shrink-0 gap-4 items-center justify-center overflow-hidden rounded-md">
            <div className="img-container w-[80vw] md:w-[40vw] relative aspect-[16/9]">
                <Image
                    src={src}
                    fill
                    className="rounded-md object-cover"
                    alt={desc}
                />
            </div>
            <div className="text-sm text-mono mono">{desc}</div>
        </div>
    );
};

export default RenderCard;
