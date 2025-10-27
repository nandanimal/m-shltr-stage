import { useEffect, useState } from "react";

export function useSectionTheme(options = { threshold: 0.5 }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("[data-theme]"));
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible && visible.target) {
                const section = visible.target;
                const nextTheme =
                    section.dataset.theme === "dark" ? "dark" : "light";
                setTheme(nextTheme);
            }
        }, options);

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [options.root, options.rootMargin, options.threshold]);

    return theme;
}
