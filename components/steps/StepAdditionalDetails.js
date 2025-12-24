import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

export default function StepAdditionalDetails() {
    const { data, update, next, prev } = useCtaFlow();
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_CTA_ID;
    const [state, handleSubmit] = useForm(formId);
    const [details, setDetails] = useState(data.additionalDetails || "");

    useEffect(() => {
        setDetails(data.additionalDetails || "");
    }, [data.additionalDetails]);

    useEffect(() => {
        if (state.succeeded) {
            next();
        }
    }, [state.succeeded, next]);

    function onSubmit(e) {
        update({ additionalDetails: details });
        handleSubmit(e);
    }

    return (
        <form onSubmit={onSubmit} className="w-full">
            <div className="type-h2 font-dince">
                Is there anything else you&apos;d like to share about your
                project?
            </div>

            <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                className="w-full mt-8 p-2 border-b border-black focus:outline-none bg-transparent resize-none"
                placeholder="Optional details..."
            />
            <ValidationError
                prefix="Additional details"
                field="additionalDetails"
                errors={state.errors}
            />

            <input type="hidden" name="zip" value={data.zip} />
            <input type="hidden" name="projectType" value={data.projectType} />
            <input type="hidden" name="timeline" value={data.timeline} />
            <input
                type="hidden"
                name="landOwnership"
                value={data.landOwnership}
            />
            <input type="hidden" name="landAddress" value={data.landAddress} />
            <input
                type="hidden"
                name="launchSource"
                value={data.launchSource || ""}
            />

            <div className="flex gap-2 mt-8 w-full items-end justify-between">
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
                    Continue
                </button>
            </div>
            <ValidationError errors={state.errors} />
        </form>
    );
}
