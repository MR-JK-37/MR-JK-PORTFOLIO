'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ paddingTop: '100px' }}
            >
                <div className="container section">
                    <h1 className="section-title">About Me</h1>

                    <div
                        className="card"
                        style={{
                            padding: '40px',
                            maxWidth: '800px',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '24px',
                            }}>
                                Building Digital Experiences
                            </h2>

                            <p style={{
                                fontSize: '15px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: '20px',
                            }}>
                                I&apos;m a Full-Stack Engineer passionate about creating elegant solutions
                                to complex problems. With expertise spanning modern web technologies,
                                I craft applications that are both performant and user-friendly.
                            </p>

                            <p style={{
                                fontSize: '15px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.8,
                                marginBottom: '20px',
                            }}>
                                My journey in tech began with a curiosity for how things work,
                                evolving into a career focused on building scalable systems and
                                intuitive interfaces. I believe in clean code, thoughtful design,
                                and continuous learning.
                            </p>

                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                marginTop: '32px',
                                paddingTop: '24px',
                                borderTop: '1px solid var(--border)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '28px', fontWeight: 600, color: 'var(--accent)' }}>5+</span>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Years Experience</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '28px', fontWeight: 600, color: 'var(--accent)' }}>50+</span>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Projects Completed</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '28px', fontWeight: 600, color: 'var(--accent)' }}>10+</span>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Technologies</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.main>
            <Footer />
        </>
    );
}
