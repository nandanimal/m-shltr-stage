import React from "react";

const GalleryHeader = ({ title, body }) => {
    return (
        <div>
            <section
                data-nav-theme="light"
                className="space-y-4 mt-48 mb-24 modern-padding border-t border-gray"
            >
                <div className="text-black font-mono text-xs text-center">
                    {title}{" "}
                </div>
                <div className="type-body text-gray text-center max-w-2xl m-auto">
                    {body}
                </div>
            </section>
        </div>
    );
};

export default GalleryHeader;
