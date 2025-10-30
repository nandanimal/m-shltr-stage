import React from "react";

const ModuleCard = ({ title, src, index }) => {
    return (
        <>
            <img
                className="aspect-16/9 bg-[#E4E4E4] rounded-sm"
                style={{ flexGrow: 0, flexShrink: 0 }}
                src={src}
                alt={title}
            />
        </>
    );
};

export default ModuleCard;
