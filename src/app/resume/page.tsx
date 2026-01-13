'use client';

import { motion } from 'framer-motion';

export default function ResumePage() {
    return (
        <main className="container section">
            <header style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: '16px' }}>Service Dossier</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                        The complete professional record of system architecture,
                        deployment history, and technical proficiency.
                    </p>
                </div>
                <button onClick={() => window.print()} className="btn btn-primary">
                    EXPORT_PDF
                </button>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '64px', maxWidth: '800px', margin: '0 auto' }}
            >
                {/* Resume Identity */}
                <div style={{ textAlign: 'center', marginBottom: '64px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
                    <h2 style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '8px' }}>MR!JK!</h2>
                    <div className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}>
                        Full-Stack System Engineer
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
                        <span>SIGNAL: contact@mrjk.dev</span>
                        <span>NODE: GLOBAL/REMOTE</span>
                        <span>WEB: MRJK.DEV</span>
                    </div>
                </div>

                {/* Experience */}
                <section style={{ marginBottom: '48px' }}>
                    <h3 className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px' }}>DEPLOYMENT HISTORY</h3>
                    <div style={{ display: 'grid', gap: '32px' }}>
                        <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Senior Full-Stack Architect</h4>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2024 — PRESENT</span>
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '12px' }}>Tech Core Solutions</div>
                            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'grid', gap: '8px', paddingLeft: '16px' }}>
                                <li>Engineered highly resilient microservices architecture for real-time data streams.</li>
                                <li>Optimized frontend delivery pipelines, reducing time-to-interactive by 40%.</li>
                                <li>Architected secure identity management systems handling 1M+ concurrent users.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Skills Grid */}
                <section style={{ marginBottom: '48px' }}>
                    <h3 className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px' }}>CORE PROFICIENCIES</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {[
                            { label: 'Languages', items: 'TypeScript, Go, Python, SQL' },
                            { label: 'Foundations', items: 'React, Next.js, Node.js' },
                            { label: 'Infrastructure', items: 'Docker, K8s, Terraform, AWS' },
                        ].map(skill => (
                            <div key={skill.label}>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{skill.label}</div>
                                <div style={{ fontSize: '14px' }}>{skill.items}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h3 className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px' }}>ACADEMIC TRACE</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 700 }}>B.Tech in Computer Science</h4>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>University of Technology</div>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2020 — 2024</span>
                    </div>
                </section>
            </motion.div>
        </main>
    );
}
