'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const messages = [
  "Initializing System...",
  "Scanning Hardware...",
  "Bypassing Security Firewalls...",
  "Accessing MR!JK!'s Portfolio...",
  "Decryption Complete. System Stable."
];

export default function EntryPage() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (msgIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMsgIndex(msgIndex + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [msgIndex]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <main className="scanline" style={{
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at center, #0a1128 0%, #000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'fixed'
    }}>
      {/* Animated Energy Core */}
      <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            width: '240px',
            height: '240px',
            border: '1px solid rgba(0, 200, 212, 0.2)',
            borderRadius: '50%',
            position: 'absolute'
          }}
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{
            width: '180px',
            height: '180px',
            border: '1px solid rgba(0, 200, 212, 0.4)',
            borderRadius: '50%',
            position: 'absolute'
          }}
        />

        <div style={{
          width: '12px',
          height: '12px',
          background: 'var(--accent)',
          borderRadius: '50%',
          boxShadow: '0 0 30px var(--accent)',
          position: 'relative',
          zIndex: 10
        }} />
      </div>

      {/* Typing Container */}
      <div style={{ marginTop: '60px', height: '60px', textAlign: 'center' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent)',
              fontSize: '16px',
              letterSpacing: '2px',
              textShadow: '0 0 8px var(--accent)'
            }}
          >
            {messages[msgIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enter Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: msgIndex === messages.length - 1 ? 1 : 0 }}
        style={{ marginTop: '40px' }}
      >
        <button
          onClick={handleEnter}
          className="btn btn-secondary"
          style={{
            padding: '16px 48px',
            fontSize: '14px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            borderColor: 'var(--accent)',
            background: 'rgba(0, 200, 212, 0.05)'
          }}
        >
          [ ENTER SYSTEM ]
        </button>
      </motion.div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0a0a0f',
              zIndex: 2000
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
