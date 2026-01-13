'use client';

import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    showDivider?: boolean;
}

export default function Section({ id, title, children, showDivider = true }: SectionProps) {
    return (
        <>
            {showDivider && (
                <div className="container">
                    <div className="section-divider" />
                </div>
            )}

            <motion.section
                id={id}
                className="section container"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="section-heading">
                    <h2>{title}</h2>
                    <div className="section-heading-line" />
                </div>

                {children}
            </motion.section>
        </>
    );
}
