import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import StepZip from "../components/steps/StepZip";
import StepForm from "../components/steps/StepForm";
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
        eligibility: null, // 'allowed' | 'waitlist'
        name: "",
        email: "",
        phone: "",
        address: "",
        projectType: "ADU",
        timeline: "",
        notes: "",
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
            { id: "zip", Component: StepZip },
            { id: "form", Component: StepForm },
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
                        className="text-black rounded-sm backdrop-blur-md shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition"
                    >
                        <button
                            className="bg-orange-600  h-auto hover:bg-red-500 cursor-pointer transition rounded-xs w-[36px] h-full"
                            onClick={closeCta}
                            aria-label="Close"
                            style={{ color: "rgba(255, 196, 157, 0.8)" }}
                        >
                            ×
                        </button>
                        <div style={{ padding: 24 }}>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                            >
                                <Step />
                            </motion.div>
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
        padding: 12,
    },
    modal: {
        width: "min(720px, 92vw)",
        maxHeight: "90vh",
        overflow: "auto",
        border: "1px solid #F2F2EE",
        background: "rgba(242, 242, 238, 0.8)",
        // boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        position: "relative",
    },
    closeBtn: {
        position: "absolute",
        top: 8,
        right: 10,
        width: 36,
        height: 36,
        borderRadius: 8,
        border: "1px solid #ddd",
        //
        cursor: "pointer",
        fontSize: 20,
        lineHeight: "20px",
    },
};
