'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from './MatrixRain';

export default function IntroOverlay({ onEnter }: { onEnter: () => void }) {
    const [text, setText] = useState('');
    const fullText = "WELCOME TO MR!JK!'S PORTFOLIO...";
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) {
                clearInterval(interval);
                setShowButton(true);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
            exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <MatrixRain />

            <div className="z-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-widest glitch-text neon-text" data-text={text}>
                    {text}
                    <span className="animate-pulse">_</span>
                </h1>

                <AnimatePresence>
                    {showButton && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00f0ff" }}
                            onClick={onEnter}
                            className="mt-8 px-8 py-3 text-xl border border-[var(--neon-blue)] text-[var(--neon-blue)] rounded-none hover:bg-[var(--neon-blue-dim)] transition-all duration-300 backdrop-blur-sm"
                        >
                            ENTER SYSTEM
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-0 w-full h-1 bg-[var(--neon-blue)] animate-pulse shadow-[0_0_20px_#00f0ff]"></div>
        </motion.div>
    );
}
