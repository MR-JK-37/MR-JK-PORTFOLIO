'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="container section">
            {/* Hero Section */}
            <header style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                    <span className="neon-text" style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        background: 'rgba(0, 200, 212, 0.1)',
                        padding: '4px 12px',
                        border: '1px solid var(--accent)',
                        borderRadius: '20px'
                    }}>
                        SYSTEM: ONLINE
                    </span>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        color: 'var(--text-muted)',
                        padding: '4px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '20px'
                    }}>
                        ACCESS: ELITE
                    </span>
                </div>

                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        fontSize: 'clamp(48px, 10vw, 84px)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        marginBottom: '24px',
                        letterSpacing: '-3px',
                        background: 'linear-gradient(135deg, #fff 0%, var(--accent) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    MR!JK!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: '20px',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        marginBottom: '48px',
                        fontWeight: 400
                    }}
                >
                    Full-Stack Engineer specialized in building highly performant,
                    secure, and visually stunning digital architecture.
                </motion.p>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <Link href="/projects" className="btn btn-primary">
                        View Projects
                    </Link>
                    <Link href="/contact" className="btn btn-secondary">
                        Get in Touch
                    </Link>
                </div>
            </header>

            {/* About Section (Integrated into Home for brief overview) */}
            <section style={{ marginTop: '100px' }}>
                <div className="glass-panel" style={{ padding: '48px', position: 'relative', overflow: 'hidden' }}>
                    <h2 className="section-title">Operational Bio</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.8, marginBottom: '24px' }}>
                                Driven by a passion for clean code and innovative design, I create robust
                                solutions for complex digital challenges. My expertise spans from
                                core infrastructure to fluid frontend experiences.
                            </p>
                            <Link href="/about" className="neon-text" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                READ FULL DOSSIER →
                            </Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { label: 'Status', value: 'Active' },
                                { label: 'Specialization', value: 'Full-Stack' },
                                { label: 'Location', value: 'Global / Remote' },
                                { label: 'Availability', value: 'Open for Hire' },
                            ].map(item => (
                                <div key={item.label} className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
