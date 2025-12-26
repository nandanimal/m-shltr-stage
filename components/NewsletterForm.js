"use client";
import { useForm, ValidationError } from "@formspree/react";

export default function NewsletterForm({ theme = "light" }) {
    const [state, handleSubmit] = useForm(
        process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID
    );
    const cardText = theme === "dark" ? "text-white" : "text-black";
    const borderTone = theme === "dark" ? "border-white/50" : "border-gray";

    if (state.succeeded) {
        return (
            <div
                className={`rounded-sm bg-blur-sm w-full gap-y-4 flex flex-col ${cardText}`}
            >
                <img
                    src="/images/cbn_gallery/cbn_25.webp"
                    className="rounded-sm"
                    alt="interior living space"
                />
                <div className="type-subtitle mt-4 header-text">Newsletter</div>
                <div className="type-body font-roboto">
                    Thanks for subscribing.
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`rounded-sm bg-blur-sm w-full gap-y-4 flex flex-col ${cardText}`}
        >
            <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
            />
            <img
                src="/images/cbn_gallery/cbn_25.webp"
                className="rounded-sm"
                alt="interior living space"
            />
            <div className="type-subtitle mt-4 header-text">Newsletter</div>
            <div className="type-body font-roboto">
                Stay up to date with the latest from M-SHLTR
            </div>
            <div className="contents flex flex-col gap-1">
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    className={`placeholder:text-gray border-b-1 focus:outline-none bg-transparent ${borderTone}`}
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
                <button
                    type="submit"
                    className="cta-button mt-8 font-mono uppercase text-left"
                    disabled={state.submitting}
                >
                    Sign up
                </button>
                <ValidationError errors={state.errors} />
            </div>
        </form>
    );
}
