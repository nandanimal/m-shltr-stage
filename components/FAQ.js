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
        question: "Why doesn’t M-shltr have its own factory?",
        answer: "Because we’re not a factory—we’re a design studio. We focus on high-end architectural design and client experience, and we partner with expert builders to construct the homes. This model keeps quality high, timelines predictable, and the process fully managed.",
    },
    {
        question: "If M-shltr doesn’t build the homes, who does?",
        answer: "We work with a select group of trusted modular builders who fabricate and install our homes to our exact specifications. These partners are licensed professionals with deep experience in modular construction—and every one of them meets the standards we’ve built our name on.",
    },
    {
        question: "Will I be dealing with multiple companies?",
        answer: "No. M-shltr remains your single point of contact throughout your project. We manage the design, permitting, builder coordination, and delivery—so you never have to juggle vendors or chase down updates.",
    },
    {
        question: "Can I meet the builder or visit the factory?",
        answer: "Yes. We believe in transparency. If you’re interested, we’re happy to arrange a factory tour or introduce you to the build team as your project progresses.",
    },
    {
        question: "Is the builder local to my site?",
        answer: "That depends on your location. Some homes are built nearby, while others are built in centralized factories and delivered to your site. We match each project with the most qualified builder based on permitting needs, logistics, and schedule.",
    },
    {
        question: "Do I get to customize my home?",
        answer: "Yes—within a smart framework. Our homes are pre-designed for efficiency and cost savings, but they’re tailored to your site, your needs, and your style. We offer a curated set of design options and upgrades to personalize your home without adding friction.",
    },
    {
        question: "How do I know the quality will be good?",
        answer: "We’ve done the hard work of vetting our builder partners, and we oversee every step of your project to ensure it meets our standards. Our builders are licensed, insured, and experienced with the unique challenges of prefab.",
    },
    {
        question: "What if something goes wrong during construction?",
        answer: "We’ve got your back. As your project manager, M-shltr is responsible for keeping everything on track and holding all partners accountable. You’ll never be left managing issues on your own.",
    },
    {
        question: "Is there a warranty?",
        answer: "Yes. Every M-shltr home includes structural and workmanship warranties—backed by both the builder and us. We’ll walk you through the details before your project begins.",
    },
    {
        question: "Who do I pay—M-shltr or the builder?",
        answer: "All payments go through M-shltr. We coordinate contracts and billing with our partners so you don’t have to manage multiple invoices or relationships.",
    },
    {
        question: "Does this approach save me money?",
        answer: "Our model reduces overhead and avoids the costs of owning and operating a factory. More importantly, it saves you time, lowers risk, and makes the entire process smoother—from design to delivery.",
    },
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
