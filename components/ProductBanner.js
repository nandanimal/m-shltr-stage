import Link from "next/link";
import React from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import Object3DViewer from "./Object3DViewer";

const ProductBanner = ({ is3d = false, explore = true }) => {
    const { openCta } = useCtaFlow();

    return (
        <div className="w-full flex items-center justify-center">
            <div className="content max-w-7xl flex flex-col sm:flex-row p-0 items-center justify-center">
                {is3d ? (
                    <Object3DViewer initial={74} />
                ) : (
                    <img
                        src="/images/cbn_shadow.png"
                        className="w-full xl:w-3/4 sm:w-1/2 h-auto object-contain"
                        alt="CBN isolated"
                    />
                )}

                <div className="col-right flex flex-col gap-1 w-full xl:w-1/2 sm:w-4/10 p-2">
                    {/* Top level header */}
                    <div className="flex flex-row justify-between">
                        <div className="col-left flex flex-col gap-1 ">
                            <h2 className="text-xl font-bold">CBN NO. 1172</h2>
                            <span>2 BED / 2.5 BATH</span>
                            <div className="text-sm">
                                1,172 ft<sup>2</sup>
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
                    <div className="mt-4 uppercase text-xs font-mono">
                        CBN brings warmth and precision to modular living.
                        Inside, custom wood cabinetry, integrated Pitt cooktops,
                        and a central skylight define a bright, crafted
                        interior. Two ensuite bedrooms and multiple layout
                        orientations create space to live comfortably, anywhere.
                    </div>
                    {/* Description */}
                    <div className="button-row flex flex-row gap-4 mt-8 font-mono">
                        <div
                            onClick={openCta}
                            className="order-now flex flex-row gap-2 cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition"
                        >
                            PRE-ORDER
                            <img className="" src="/icons/arrow-up-right.svg" />
                        </div>
                        {explore && (
                            <Link
                                href="/cbn"
                                className="order-now flex flex-row gap-2 text-gray cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition"
                            >
                                EXPLORE FEATURES
                                {/* <img
                                className=""
                                src="/icons/arrow-down-gray.svg"
                            /> */}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBanner;
