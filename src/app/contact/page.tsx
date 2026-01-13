'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <main className="container section">
            <header style={{ marginBottom: '64px' }}>
                <h1 className="section-title" style={{ marginBottom: '16px' }}>Secure Handshake</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    Establish a direct communication channel. Whether it&apos;s a project proposal
                    or a technical inquiry, my frequency is always open.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px' }}>
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="glass-panel" style={{ padding: '48px' }}>
                        <h3 className="neon-text" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '32px' }}>ACCESS COORDINATES</h3>

                        <div style={{ display: 'grid', gap: '32px' }}>
                            {[
                                { label: 'Signal ID', value: 'contact@mrjk.dev' },
                                { label: 'Location', value: 'Distributed Node (Remote)' },
                                { label: 'Office Hours', value: '10:00 - 18:00 UTC' },
                            ].map(item => (
                                <div key={item.label}>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 500 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <form className="glass-panel" style={{ padding: '48px', display: 'grid', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Identification</label>
                            <input type="text" placeholder="YOUR NAME" style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)',
                                padding: '12px',
                                borderRadius: '6px',
                                color: '#fff',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Return Frequency</label>
                            <input type="email" placeholder="EMAIL ADDRESS" style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)',
                                padding: '12px',
                                borderRadius: '6px',
                                color: '#fff',
                                outline: 'none'
                            }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Data Payload</label>
                            <textarea placeholder="HOW CAN I ASSIST THE MISSION?" style={{
                                width: '100%',
                                height: '150px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border)',
                                padding: '12px',
                                borderRadius: '6px',
                                color: '#fff',
                                outline: 'none',
                                resize: 'none'
                            }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            SEND_PAYLOAD
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
