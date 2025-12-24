import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import StepZip from "../components/steps/StepZip";
import StepProjectType from "../components/steps/StepProjectType";
import StepProjectTimeline from "../components/steps/StepProjectTimeline";
import StepLandOwnership from "../components/steps/StepLandOwnership";
import StepAdditionalDetails from "../components/steps/StepAdditionalDetails";
import StepCalendly from "../components/steps/StepCalendly";
import { motion, AnimatePresence } from "framer-motion";

const CtaFlowContext = createContext(null);

export function CtaFlowProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Shared flow data
    const [data, setData] = useState({
        launchSource: null,
        zip: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        projectType: "",
        timeline: "",
        landOwnership: "",
        landAddress: "",
        additionalDetails: "",
        calendlyScheduled: false,
    });

    const openCta = (opts = {}) => {
        setData((d) => ({ ...d, launchSource: opts.source || null }));
        setIsOpen(true);
        setStep(0);
    };

    const closeCta = () => setIsOpen(false);
    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prev = () => setStep((s) => Math.max(s - 1, 0));
    const update = (patch) => setData((d) => ({ ...d, ...patch }));

    const steps = useMemo(
        () => [
            { id: "location", Component: StepZip },
            { id: "type", Component: StepProjectType },
            { id: "timeline", Component: StepProjectTimeline },
            { id: "land", Component: StepLandOwnership },
            { id: "details", Component: StepAdditionalDetails },
            { id: "calendly", Component: StepCalendly },
        ],
        []
    );

    // Escape to close
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") closeCta();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const value = {
        isOpen,
        step,
        steps,
        data,
        loading,
        openCta,
        closeCta,
        next,
        prev,
        update,
        setLoading,
    };

    return (
        <CtaFlowContext.Provider value={value}>
            {children}
            <CtaFlowModal />
        </CtaFlowContext.Provider>
    );
}

export function useCtaFlow() {
    const ctx = useContext(CtaFlowContext);
    if (!ctx) throw new Error("useCtaFlow must be used within CtaFlowProvider");
    return ctx;
}

function CtaFlowModal() {
    const { isOpen, closeCta, step, steps } = useCtaFlow();
    if (!isOpen) return null;

    const portalTarget =
        typeof window !== "undefined"
            ? document.getElementById("modal-root")
            : null;
    if (!portalTarget) return null;

    const Step = steps[step].Component;

    return ReactDOM.createPortal(
        <>
            <AnimatePresence>
                <motion.div
                    style={styles.backdrop}
                    role="dialog"
                    aria-modal="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        style={styles.modal}
                        className="text-black backdrop-blur-md shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition dince font-dince text-dince"
                    >
                        <button
                            className="absolute top-4 right-4 bg-black text-white hover:bg-black/80 cursor-pointer transition rounded-xs w-[36px] h-[36px]"
                            onClick={closeCta}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="w-full h-full flex items-center justify-center p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={steps[step].id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="w-full max-w-3xl"
                                >
                                    <Step />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>,
        portalTarget
    );
}

const styles = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 0,
    },
    modal: {
        width: "100vw",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "auto",
        border: "none",
        background: "rgba(242, 242, 238, 0.8)",
        // boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        position: "relative",
    },
};
