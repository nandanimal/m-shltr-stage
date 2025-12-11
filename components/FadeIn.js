import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const FadeIn = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.1 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: hasAnimated ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
