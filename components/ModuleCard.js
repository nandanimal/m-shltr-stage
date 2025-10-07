import React from "react";

const ModuleCard = ({ title, src, index }) => {
    return (
        <div className="aspect-16/9 min-w-[400px] bg-[#E4E4E4] rounded-sm">
            <div className="top-row bg-[#EEEEEE] flex flex-row justify-between p-1 font-mono text-xs uppercase text-gray">
                <span>Model {index}</span>
                <span>{title}</span>
            </div>
            <img src={src} alt={title} />
        </div>
    );
};

export default ModuleCard;
