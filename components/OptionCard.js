import React from "react";

export default function OptionCard({
    name,
    value,
    checked,
    onChange,
    dimmed = false,
    onHover,
    children,
}) {
    return (
        <label
            className={`w-full flex items-center justify-between border backdrop-blur-sm rounded-sm px-4 py-4 transition-opacity duration-200 cursor-pointer bg-white/60 hover:bg-white ${
                checked ? "border-gray" : "border-gray/20"
            } ${dimmed ? "opacity-40" : "opacity-80"}`}
            onMouseEnter={() => onHover?.(value)}
            onMouseLeave={() => onHover?.(null)}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange?.(value)}
                className="sr-only"
            />
            <span className="type-subtitle">{children}</span>
        </label>
    );
}
