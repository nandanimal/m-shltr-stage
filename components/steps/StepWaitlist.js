import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

export default function StepWaitlist() {
    const { data, update, prev, closeCta } = useCtaFlow();
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ZIP_ID;
    const [state, handleSubmit] = useForm(formId);
    const [email, setEmail] = useState(data.waitlistEmail || "");

    useEffect(() => {
        setEmail(data.waitlistEmail || "");
    }, [data.waitlistEmail]);

    function onSubmit(e) {
        update({ waitlistEmail: email });
        handleSubmit(e);
    }

    if (state.succeeded) {
        return (
            <div className="w-full">
                <div className="type-h2 font-dince">
                    Thanks — we&apos;ll be in touch.
                </div>
                <p className="mt-6 type-body">
                    You&apos;ll be notified when your area becomes available.
                </p>
                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={closeCta}
                        className="cta-button text-black"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="w-full">
            <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
            />
            <div className="type-h2 font-dince">
                Get notified when your area becomes available.
            </div>

            <input type="hidden" name="zip" value={data.zip} />
            <input type="hidden" name="eligibility" value="waitlist" />
            <input
                type="hidden"
                name="launchSource"
                value={data.launchSource || ""}
            />

            <input
                id="waitlistEmail"
                name="waitlistEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full mt-8 p-1 border-b border-black focus:outline-none  bg-transparent"
                required
            />
            <ValidationError
                prefix="Email"
                field="waitlistEmail"
                errors={state.errors}
            />

            <div className="flex gap-2 mt-6 w-full items-center justify-between">
                <button
                    type="button"
                    onClick={prev}
                    className="px-4 py-2 rounded-xs border border-black/40 text-black cursor-pointer"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={state.submitting}
                    className={`cta-button text-black ${
                        state.submitting ? "opacity-40 pointer-events-none" : ""
                    }`}
                >
                    Notify me
                </button>
            </div>
            <ValidationError errors={state.errors} />
        </form>
    );
}
