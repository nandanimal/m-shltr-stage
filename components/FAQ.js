import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Question = ({ q, a, isOpen, onClick }) => {
    return (
        <div
            className="p-4 rounded-md bg-white cursor-pointer flex flex-col gap-2 text-md"
            onClick={onClick}
        >
            <span className="font-medium">{q}</span>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <span>{a}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const questions = [
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lit? ",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lit?",
    },
    {
        question: "Lorem ipsum dolor sit amet, consectetur adip?",
        answer: "Test answer 2",
    },
    { question: "Test question 3", answer: "Test answer 3" },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <div className="max-w-6xl rounded-md p-4 bg-[#E4E4E4] w-full">
            <div className="content flex flex-col sm:flex-row gap-2">
                <div className="w-1/6 h-full text-3xl">FAQ</div>
                <div className="w-full flex flex-col gap-2">
                    {questions.map((item, index) => (
                        <Question
                            key={index}
                            q={item.question}
                            a={item.answer}
                            isOpen={openIndex === index}
                            onClick={() =>
                                setOpenIndex(openIndex === index ? -1 : index)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
