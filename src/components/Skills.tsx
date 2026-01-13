'use client';

import { motion } from 'framer-motion';

const skillGroups = [
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS']
    },
    {
        title: 'Backend',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'Prisma', 'REST APIs']
    },
    {
        title: 'Tools',
        skills: ['Git', 'Docker', 'VS Code', 'Figma', 'Linux']
    }
];

export default function Skills() {
    return (
        <section id="skills" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-title">Skills</div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                        {skillGroups.map((group) => (
                            <div key={group.title}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
                                    {group.title}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            style={{
                                                padding: '6px 14px',
                                                fontSize: 13,
                                                color: 'var(--text-secondary)',
                                                background: 'var(--bg-card)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 6
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
