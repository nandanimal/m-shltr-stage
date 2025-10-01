import React from "react";

const ProductBanner = () => {
    return (
        <div className="w-full">
            <div className="content max-w-3xl flex flex-col sm:flex-row gap-4">
                <img src="" />
                <div className="col-right flex flex-col gap-1">
                    <h2 className="text-xl">/\\ CBN</h2>
                    <span>2 BED/2 BATH</span>
                    <div className="text-sm">
                        680 ft<sup>2</sup>
                    </div>
                    <div className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Duis sit amet ex scelerisque, convallis risus sodales,
                        ullamcorper est.
                    </div>
                    <div className="button-row flex flex-row gap-4 mt-4">
                        <div className="order-now flex flex-row gap-2 cursor-pointer leading-none items-center justify-center">
                            ORDER NOW
                            <img
                                className="mb-1"
                                src="/icons/arrow-up-right.svg"
                            />
                        </div>
                        <div className="order-now flex flex-row gap-2 text-gray cursor-pointer leading-none items-center justify-center">
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
