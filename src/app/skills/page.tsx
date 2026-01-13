'use client';

import { motion } from 'framer-motion';

const skills = [
    { category: 'Frontend Architecture', items: ['React', 'Next.js', 'Redux', 'Framer Motion', 'Tailwind', 'Three.js'] },
    { category: 'Backend Ecosystem', items: ['Node.js', 'Express', 'Python / Django', 'Go (Golang)', 'PostgreSQL', 'Prisma'] },
    { category: 'System Security', items: ['JWT / OAuth2', 'Penetration Testing', 'Secure API Design', 'Data Encryption', 'SSL/TLS'] },
    { category: 'DevOps & Tooling', items: ['Docker', 'Kubernetes', 'Actions CICD', 'AWS / Vercel', 'Git / Linux', 'Terraform'] },
];

export default function SkillsPage() {
    return (
        <main className="container section">
            <header style={{ marginBottom: '64px' }}>
                <h1 className="section-title" style={{ marginBottom: '16px' }}>Technical Stack</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    My specialized weapon system. A curated set of technologies and
                    methodologies for high-performance software engineering.
                </p>
            </header>

            <div className="grid grid-3">
                {skills.map((skillGroup, groupIndex) => (
                    <motion.div
                        key={skillGroup.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: groupIndex * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '32px' }}
                    >
                        <h3 className="neon-text" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px', textTransform: 'uppercase' }}>
                            {skillGroup.category}
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {skillGroup.items.map((skill) => (
                                <span
                                    key={skill}
                                    style={{
                                        fontSize: '13px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '6px',
                                        padding: '6px 14px',
                                        color: 'var(--text-secondary)'
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
