const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                black: "#272727",
                white: "#F2F2EE",
                gray: "#BCB5AF",
            },
            fontFamily: {
                dince: "var(--font-dince)",
                mono: "var(--font-ibmPlexMono)",
            },
            lineHeight: {
                default: "1.1",
            },
        },
    },
    plugins: [
        plugin(({ addBase }) => {
            addBase({
                "html, body": {
                    lineHeight: "1.1",
                },
            });
        }),
    ],
};
