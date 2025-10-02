import React from "react";

const ProductBanner = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="content max-w-7xl flex flex-col sm:flex-row gap-4 p-4 items-center justify-center">
                <img
                    src="/images/cbn_shadow.png"
                    className="w-full xl:w-3/4 sm:w-1/2 h-auto object-contain"
                    alt="CBN isolated"
                />
                <div className="col-right flex flex-col gap-1 w-full xl:w-1/2 sm:w-4/10">
                    {/* Top level header */}
                    <div className="flex flex-row justify-between">
                        <div className="col-left flex flex-col gap-1">
                            <h2 className="text-xl">/\\ CBN</h2>
                            <span>2 BED/2 BATH</span>
                            <div className="text-sm">
                                680 ft<sup>2</sup>
                            </div>
                        </div>
                        <div className="col-right">
                            <img
                                src="/images/cbn_outline.png"
                                alt="cbn schematic"
                                className="max-w-[120px]"
                            />
                        </div>
                    </div>
                    <div className="mt-4 uppercase font-mono">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis sit amet ex scelerisque, convallis risus sodales,
                        ullamcorper est.
                    </div>
                    {/* Description */}
                    <div className="button-row flex flex-row gap-4 mt-8">
                        <div className="order-now flex flex-row gap-2 cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition">
                            ORDER NOW
                            <img
                                className="mb-1"
                                src="/icons/arrow-up-right.svg"
                            />
                        </div>
                        <div className="order-now flex flex-row gap-2 text-gray cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition">
                            EXPLORE FEATURES
                            <img
                                className="mb-1"
                                src="/icons/arrow-down-gray.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBanner;
