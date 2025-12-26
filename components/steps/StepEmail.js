import { useEffect, useState } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

export default function StepEmail() {
    const { data, update, next, goTo } = useCtaFlow();
    const [email, setEmail] = useState(data.email || "");

    useEffect(() => {
        setEmail(data.email || "");
    }, [data.email]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        update({ email });
        next();
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="type-h2 font-dince">What&apos;s your email?</div>

            <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full mt-8 p-1 border-b border-black focus:outline-none type-display bg-transparent placeholder:text-gray"
                required
            />

            <div className="flex gap-2 mt-6 w-full items-end justify-between">
                <button
                    type="button"
                    onClick={() => goTo("location")}
                    className="back-button font-mono uppercase h-full"
                >
                    Back
                </button>
                <button type="submit" className="cta-button text-black">
                    Next
                </button>
            </div>
        </form>
    );
}
