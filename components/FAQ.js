import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Question = ({ q, a, isOpen, onClick }) => {
    return (
        <div
            className="p-4 rounded-md bg-white cursor-pointer flex flex-col gap-2 text-md"
            onClick={onClick}
        >
            <span className="font-bold font-dince">{q}</span>
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

const sections = [
    {
        title: "Build partners and delivery",
        items: [
            {
                question: "Who builds M-SHLTR homes?",
                answer: "We collaborate with a select group of licensed modular builders, experts who specialize in high-precision fabrication and installation. Each is carefully vetted to ensure they meet M-SHLTR's exacting standards for quality, safety, and finish.",
            },
            {
                question: "Will I be working with multiple companies?",
                answer: "No. M-Shltr remains your single point of contact throughout design, permitting, manufacturing, and delivery. We coordinate every step behind the scenes to keep your project effortless and on track.",
            },
            {
                question: "Can I visit the factory or meet the build team?",
                answer: "Absolutely. Transparency is part of our process. If you’d like to see where your home is being built or meet the team handling it, we’ll make the introductions and arrange a tour when possible.",
            },
            {
                question: "Can I meet the builder or visit the factory?",
                answer: "Yes. We believe in transparency. If you’re interested, we’re happy to arrange a factory tour or introduce you to the build team as your project progresses.",
            },
        ],
    },
    {
        title: "Permitting and site readiness",
        items: [
            {
                question: "Is the builder local to my site?",
                answer: "It depends on your project location. Some homes are built regionally, while others are fabricated in centralized facilities and delivered to your site. We always match your project with the builder best suited to your permitting needs, logistics, and timeline.",
            },
            {
                question: "What happens if the M-SHLTR is not permitted?",
                answer: "If your local building department does not approve your M-Shltr during the permitting process, we will refund the remaining balance of your 10% reservation deposit in full. Our goal is to make the process transparent and low-risk from the start, ensuring you only move forward once your site and home are fully cleared for approval.",
            },
        ],
    },
    {
        title: "Design and customization",
        items: [
            {
                question: "Can I customize my home?",
                answer: "Yes, within a smart and streamlined framework. Each M-Shltr home designed by Malek Alqadi is created for efficiency but can be tailored to your site, lifestyle, and aesthetic. You can choose from our curated palette of finishes and fixtures or request custom materials to make your home distinctly yours. For clients seeking something truly unique, we also design fully custom homes and larger projects—reach out with any ideas or requests, and our team will help bring them to life.",
            },
        ],
    },
    {
        title: "Quality, warranty, and payments",
        items: [
            {
                question: "How do you ensure quality?",
                answer: "Our team oversees every step of fabrication and installation, verifying that each detail meets our design and performance standards. All builders are licensed, insured, and experienced in modern modular construction.",
            },
            {
                question: "Is there a warranty?",
                answer: "Every M-Shltr home includes a 1-year workmanship warranty covering materials and finishes, a 2-year systems warranty covering mechanical, electrical, plumbing, and HVAC systems, and a 5-year structural warranty covering load-bearing components of the module. Coverage is clearly defined and transferable during the term. Exclusions apply for modifications not approved by M-Shltr, owner-site-responsible items (foundation, soil movement) and normal wear & tear. M-Shltr manages all claims as your single point of contact.",
            },
            {
                question: "How do payments work?",
                answer: "All payments go through M-Shltr. We streamline contracts and billing so you have one clear, transparent process from start to finish.",
            },
            {
                question: "Does this approach save me money?",
                answer: "It saves what matters most: time, clarity, and peace of mind. By partnering with top modular builders instead of operating our own facility, we reduce overhead, minimize risk, and deliver a faster, higher-quality build for every client.",
            },
        ],
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <div
            className="max-w-6xl rounded-md p-4 bg-gray/10 w-full"
            data-nav-theme="dark"
        >
            <div className="content flex flex-col sm:flex-row gap-2">
                <div className="w-1/6 h-full type-h2">FAQ</div>
                <div className="w-full flex flex-col gap-6">
                    {sections.map((section, sectionIdx) => {
                        const baseIndex = sections
                            .slice(0, sectionIdx)
                            .reduce(
                                (acc, curr) => acc + (curr.items?.length || 0),
                                0
                            );
                        return (
                            <div
                                key={section.title}
                                className="flex flex-col gap-2"
                            >
                                <div className="text-xl font-dince text-gray">
                                    {section.title}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {section.items.map((item, itemIdx) => {
                                        const idx = baseIndex + itemIdx;
                                        return (
                                            <Question
                                                key={item.question}
                                                q={item.question}
                                                a={item.answer}
                                                isOpen={openIndex === idx}
                                                onClick={() =>
                                                    setOpenIndex(
                                                        openIndex === idx
                                                            ? -1
                                                            : idx
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
