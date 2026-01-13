'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';

export default function AdminGate() {
    const [step, setStep] = useState(1); // 1: Who are you?, 2: How can I trust you?, 3: Key
    const [key, setKey] = useState('');
    const [setupRequired, setSetupRequired] = useState(false);
    const [confirmKey, setConfirmKey] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const { checkAuth } = useAdmin();

    useEffect(() => {
        // Initial status check to see if setup is needed
        const checkStatus = async () => {
            const res = await fetch('/api/auth/check-setup');
            const data = await res.json();
            if (!data.isSetup) {
                setSetupRequired(true);
                setStep(3); // Go straight to key entry for setup
            }
        };
        checkStatus();
    }, []);

    const handleIdentify = () => setStep(2);
    const handleProve = () => setStep(3);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        if (setupRequired) {
            if (key !== confirmKey) {
                setError('Keys do not match');
                setIsProcessing(false);
                return;
            }
            const res = await fetch('/api/auth/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            });
            if (res.ok) {
                setSetupRequired(false);
                setKey('');
                setConfirmKey('');
                setStep(3); // Reset to login step
            } else {
                setError('Setup failed');
            }
        } else {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key })
            });
            if (res.ok) {
                await checkAuth();
                router.push('/home');
            } else {
                setError('INVALID_CREDENTIALS');
                setKey('');
            }
        }
        setIsProcessing(false);
    };

    return (
        <main className="scanline" style={{
            height: '100vh',
            width: '100vw',
            background: '#06060a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 3000
        }}>
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ textAlign: 'center' }}
                    >
                        <h1 className="neon-text" style={{ fontSize: '24px', letterSpacing: '8px', marginBottom: '48px' }}>WHO ARE YOU?</h1>
                        <button
                            onClick={handleIdentify}
                            className="btn btn-primary"
                            style={{ padding: '16px 64px', fontSize: '14px', letterSpacing: '4px' }}
                        >
                            [ MR!JK! ]
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        style={{ textAlign: 'center' }}
                    >
                        <h2 style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>How can I trust you? Prove me.</h2>
                        <button
                            onClick={handleProve}
                            className="btn btn-secondary"
                            style={{ padding: '12px 32px' }}
                        >
                            INITIATE_PROOFS
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.form
                        key="step3"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ width: '100%', maxWidth: '300px', textAlign: 'center' }}
                    >
                        {setupRequired && (
                            <div style={{ marginBottom: '24px', color: 'var(--accent)', fontSize: '12px', letterSpacing: '1px' }}>
                                [ INITIAL_KEY_SETUP ]
                            </div>
                        )}

                        <input
                            type="password"
                            autoFocus
                            placeholder={setupRequired ? "ENTER_NEW_SECRET" : "SECRET_KEY_REQUIRED"}
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '2px solid var(--accent)',
                                padding: '12px',
                                color: '#fff',
                                textAlign: 'center',
                                outline: 'none',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '4px',
                                fontSize: '18px',
                                marginBottom: '24px'
                            }}
                        />

                        {setupRequired && (
                            <input
                                type="password"
                                placeholder="CONFIRM_SECRET"
                                value={confirmKey}
                                onChange={(e) => setConfirmKey(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '2px solid var(--accent)',
                                    padding: '12px',
                                    color: '#fff',
                                    textAlign: 'center',
                                    outline: 'none',
                                    fontFamily: 'var(--font-mono)',
                                    letterSpacing: '4px',
                                    fontSize: '18px',
                                    marginBottom: '24px'
                                }}
                            />
                        )}

                        {error && <div style={{ color: '#ff0055', fontSize: '10px', marginBottom: '16px', letterSpacing: '1px' }}>{error}</div>}

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: isProcessing ? 0.5 : 1 }}
                        >
                            {isProcessing ? 'PROCESSING...' : setupRequired ? 'STORE_IDENTITY' : 'VALIDATE_IDENTITY'}
                        </button>

                        <div style={{ marginTop: '24px' }}>
                            <Link href="/home" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}>
                                ABORT_MISSION
                            </Link>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </main>
    );
}

// Internal helper for routing back home
import Link from 'next/link';
