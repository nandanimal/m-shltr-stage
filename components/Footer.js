import React from "react";

const EmailCapture = () => {
    return (
        <div className="rounded-sm bg-white/80 bg-blur-sm p-1 sm:w-md w-full">
            <div className="font-mono uppercase text-sm leading-none">
                newsletter
            </div>
            <div className="contents flex flex-col gap-1">
                <input
                    type="text"
                    placeholder="name@email.com"
                    className="placeholder:text-gray border-b-1 border-gray focus:outline-none"
                ></input>
                <div className="cta-button">Submit</div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="w-full relative">
            <div className="footer-top-row w-full flex flex-row justify-between items-center gap-8 p-2">
                <div className="logo-container leading-none ml-1 whitespace-nowrap">
                    <img
                        src="/images/wordmark_black.svg"
                        className="h-[16px]"
                        alt="logo"
                    />
                </div>
                <div className="bg-gray h-[1px] w-full"></div>
                {/* <div className="whitespace-nowrap flex flex-row items-center justify-center leading-none">
                    Text CTA
                </div> */}
            </div>
            <div className="">
                <img
                    src="/images/chmbr_iso.png"
                    className="w-full hidden md:block rounded-md "
                />
            </div>
            <div className="">
                <img
                    src="/images/chmbr_iso_mobile.png"
                    className="w-full  md:hidden rounded-sm"
                />
            </div>
            <div className="absolute w-full p-4 flex sm:flex-row flex-col-reverse sm:flex-col gap-4 justify-between sm:items-end sm:bottom-2 bottom-0">
                {/* Left */}
                <div className="text-gray text-xs font-mono flex flex-col gap-0 uppercase w-full">
                    <span>
                        © 2025{" "}
                        <a className="hover:underline" href="">
                            m-studio
                        </a>{" "}
                        /{" "}
                        <a className="hover:underline" href="">
                            privacy policy
                        </a>{" "}
                        /{" "}
                        <a className="hover:underline" href="">
                            terms of service
                        </a>
                    </span>
                    <span>
                        ∂ website by&nbsp;
                        <a
                            className="hover:underline"
                            href="https://finetooth.dev"
                            target="_blank"
                        >
                            finetooth.dev
                        </a>
                    </span>
                </div>
                {/* Right */}
                {/* <EmailCapture /> */}
            </div>
        </footer>
    );
};

export default Footer;
