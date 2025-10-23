import Link from "next/link";
import React from "react";
import CTAButton from "./CTAButton";

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
                <CTAButton text="Signup" />
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="w-full relative bg-gray relative">
            <div className="footer-top-row w-full flex flex-row justify-between items-center gap-8 p-2">
                {/* <div className="whitespace-nowrap flex flex-row items-center justify-center leading-none">
                    Text CTA
                </div> */}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="footer-menu flex flex-col gap-4 px-3">
                    <Link
                        href="/about"
                        className="text-3xl hover:opacity-70 transition"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-3xl hover:opacity-70 transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/cbn"
                        className="text-3xl hover:opacity-70 transition"
                    >
                        CBN
                    </Link>
                    <a
                        href="https://www.malekalqadi.com/"
                        className="text-3xl hover:opacity-70 transition"
                    >
                        M-Studio
                    </a>
                </div>
                {/* <div className="px-3 mt-8 md:mt-0">
                    <EmailCapture />
                </div> */}
            </div>
            {/* <div className="relative mt-8 max-w-xl rounded-sm p-2">
                <img
                    src="/images/chmbr_iso.png"
                    className="w-full  block rounded-md "
                />
            </div> */}

            <div className=" w-full p-4 flex sm:flex-row flex-col-reverse sm:flex-col gap-4 justify-between sm:items-end sm:bottom-2 bottom-0">
                {/* Left */}
                <div className=" text-xs font-mono flex flex-col gap-0 uppercase w-full">
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
