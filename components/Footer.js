import Link from "next/link";
import React from "react";

const EmailCapture = ({ theme }) => {
    const cardBg = theme === "dark" ? "bg-white/10" : "bg-white/80";
    const cardText = theme === "dark" ? "text-white" : "text-black";
    const borderTone = theme === "dark" ? "border-white/50" : "border-gray";

    return (
        <div
            className={`rounded-sm bg-blur-sm p-1 w-full gap-y-4 flex flex-col ${cardText}`}
        >
            <img
                src="/images/living.jpg"
                className="rounded-sm"
                alt="interior living space"
            />
            <div className="text-xl leading-none mt-4">Newsletter</div>
            <div className="font-roboto text-base">
                Stay up to date with the latest from M-SHLTR
            </div>
            <div className="contents flex flex-col gap-1">
                <input
                    type="text"
                    placeholder="name@email.com"
                    className={`placeholder:text-gray border-b-1 focus:outline-none bg-transparent ${borderTone}`}
                ></input>
                <div className="cta-button mt-8 font-roboto">Sign up</div>
            </div>
        </div>
    );
};

const Footer = ({ theme = "light" }) => {
    let fg, bg;
    if (theme === "dark") {
        fg = "white";
        bg = "black";
    } else {
        fg = "black";
        bg = "white";
    }

    return (
        <footer className={`w-full text-${fg}`}>
            <div className="relative max-w-[1440px] m-auto pt-8">
                <div className="flex flex-col gap-y-12 px-3">
                    <div className="logo-row">
                        <img
                            src="images/logo_black.svg"
                            className={`max-w-[48px] ${
                                theme === "dark" ? "invert" : ""
                            }`}
                        />
                    </div>
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 gap-y-12">
                        {/* M SHLTR */}
                        <div className="flex flex-col gap-4 ">
                            <Link
                                href="/"
                                className="text-gray text-xl hover:opacity-70 transition"
                            >
                                M-SHLTR
                            </Link>
                            <div className="footer-menu-links flex flex-col gap-3 text-2xl">
                                <Link
                                    href="/about"
                                    className=" hover:opacity-70 transition"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/cbn"
                                    className=" hover:opacity-70 transition"
                                >
                                    CBN
                                </Link>

                                <Link
                                    href="/faq"
                                    className=" hover:opacity-70 transition"
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="https://www.malekalqadi.com/"
                                    className=" hover:opacity-70 transition flex flex-row items-center gap-2"
                                >
                                    Get started
                                    <img
                                        className="mb-1"
                                        src="/icons/arrow-up-right.svg"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* M STUDIO */}
                        <div className="flex flex-col gap-4">
                            <div className="text-gray text-xl font-dince">
                                M-STUDIO
                            </div>
                            <div className="footer-menu-links flex flex-col gap-3 text-2xl">
                                <a
                                    href="https://www.malekalqadi.com/journal"
                                    className=" hover:opacity-70 transition"
                                >
                                    Journal
                                </a>
                                <a
                                    href="https://www.malekalqadi.com/press"
                                    className=" hover:opacity-70 transition"
                                >
                                    Press
                                </a>
                                <a
                                    href="https://www.malekalqadi.com/careers"
                                    className=" hover:opacity-70 transition"
                                >
                                    Careers
                                </a>
                                <a
                                    href="https://www.malekalqadi.com/about"
                                    className=" hover:opacity-70 transition"
                                >
                                    People
                                </a>
                                <a
                                    href="https://www.malekalqadi.com/architectureanddesignservices"
                                    className=" hover:opacity-70 transition"
                                >
                                    Process
                                </a>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex flex-col gap-4">
                            <div className="text-gray text-xl font-dince">
                                Socials
                            </div>
                            <div className="footer-menu-links flex flex-col gap-3 text-2xl">
                                <a
                                    href="https://www.instagram.com/m_shltr/?hl=en"
                                    className=" hover:opacity-70 transition"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://www.youtube.com/channel/UC4kw8ndBU-ySwtnSydMocDQ"
                                    className=" hover:opacity-70 transition"
                                >
                                    Youtube
                                </a>
                                <a
                                    href="https://www.pinterest.com/cohesion703/_saved/"
                                    className=" hover:opacity-70 transition"
                                >
                                    Pinterest
                                </a>
                            </div>
                        </div>

                        {/* Newsletter signup */}

                        <div className="hidden sm:block">
                            <EmailCapture theme={theme} />
                        </div>
                    </div>

                    {/* Newsletter mobile */}
                    <div className="block sm:hidden">
                        <EmailCapture theme={theme} />
                    </div>
                </div>

                <div className=" w-full mt-16 p-4 flex sm:flex-row flex-col-reverse sm:flex-col gap-4 justify-between sm:items-end">
                    {/* Left */}
                    <div className=" text-xs font-roboto flex flex-col gap-0 w-full">
                        <span>
                            © 2025{" "}
                            <a className="hover:underline font-dince" href="">
                                M-SHLTR
                            </a>{" "}
                            /{" "}
                            <a className="hover:underline" href="">
                                Privacy policy
                            </a>{" "}
                            /{" "}
                            <a className="hover:underline" href="">
                                Terms of service
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
            </div>
        </footer>
    );
};

export default Footer;
