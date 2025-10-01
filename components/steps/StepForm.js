import { useState, useEffect } from "react";
import { useCtaFlow } from "@/context/CtaFlowProvider";

export default function StepForm() {
    const { data, update, next, prev } = useCtaFlow();

    // Local mirrors to use simple HTML form semantics
    const [form, setForm] = useState({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        projectType: data.projectType || "ADU",
        timeline: data.timeline || "",
        notes: data.notes || "",
    });

    useEffect(() => {
        setForm((f) => ({ ...f, projectType: data.projectType || "ADU" }));
    }, [data.projectType]);

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function onSubmit(e) {
        e.preventDefault();
        // Client-only: stash in context and continue
        update({ ...form });
        // In a real app you'd POST here; we're keeping it simple per guide
        next();
    }

    return (
        <div>
            <h2 className="m-0">Tell us about your project</h2>
            <p className="text-gray-600">
                ZIP {data.zip} — great, we serve your area.
            </p>

            <form onSubmit={onSubmit}>
                <Field
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
                <Field
                    label="Your email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                />
                <Field
                    label="Your phone number"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    required
                />
                <Field
                    label="Your address (optional)"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                />

                <label className="block font-semibold mt-3">
                    What are you looking to build?
                </label>
                <select
                    name="projectType"
                    value={form.projectType}
                    onChange={onChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                >
                    <option value="ADU">ADU</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Other">Other</option>
                </select>

                <Field
                    label="Timeline — When are you hoping to start?"
                    name="timeline"
                    value={form.timeline}
                    onChange={onChange}
                />

                <label className="block font-semibold mt-3">
                    Anything else you'd like to add?
                </label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={4}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                    placeholder="Optional details…"
                />

                <div className="flex gap-2 mt-4">
                    <button
                        type="button"
                        onClick={prev}
                        className="px-4 py-2 rounded border border-gray-900 bg-gray-200 text-gray-900"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded border border-gray-900 bg-gray-900 text-white"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}

function Field({ label, name, type = "text", value, onChange, required }) {
    return (
        <div className="mt-3">
            <label className="block font-semibold" htmlFor={name}>
                {label}
                {required ? " *" : ""}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                required={required}
            />
        </div>
    );
}
