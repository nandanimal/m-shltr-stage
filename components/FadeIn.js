import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const FadeIn = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
