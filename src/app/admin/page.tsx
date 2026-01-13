'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { motion } from 'framer-motion';

export default function AdminPage() {
    const { isAdmin, logout, isLoading } = useAdmin();
    const router = useRouter();
    const [stats, setStats] = useState({
        projects: 0,
        achievements: 0,
        participation: 0
    });

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push('/admin/gate');
        }

        if (isAdmin) {
            const fetchStats = async () => {
                try {
                    const [p, a, part] = await Promise.all([
                        fetch('/api/items?type=project').then(r => r.json()),
                        fetch('/api/items?type=achievement').then(r => r.json()),
                        fetch('/api/items?type=participation').then(r => r.json())
                    ]);
                    setStats({
                        projects: p.items?.length || 0,
                        achievements: a.items?.length || 0,
                        participation: part.items?.length || 0
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            fetchStats();
        }
    }, [isAdmin, isLoading, router]);

    if (isLoading || !isAdmin) return null;

    const sections = [
        { label: 'Projects', count: stats.projects, link: '/projects', color: 'var(--accent)' },
        { label: 'Achievements', count: stats.achievements, link: '/achievements', color: '#ffd700' },
        { label: 'Participation', count: stats.participation, link: '/participation', color: '#ff0055' },
    ];

    return (
        <main className="container section">
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '64px' }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: '16px' }}>Mission Control</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>System overview and administrative node monitoring.</p>
                </div>
                <button
                    onClick={logout}
                    className="btn btn-secondary"
                    style={{
                        borderColor: 'rgba(229,69,69,0.3)',
                        background: 'rgba(229,69,69,0.05)',
                        color: '#e54545',
                    }}
                >
                    TERMINATE_SESSION
                </button>
            </header>

            <div className="grid grid-3">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                    >
                        <div className="neon-text" style={{
                            fontSize: '48px',
                            fontWeight: 900,
                            color: section.color,
                            marginBottom: '16px',
                            textShadow: `0 0 30px ${section.color}60`,
                            letterSpacing: '-2px'
                        }}>
                            {section.count.toString().padStart(2, '0')}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>
                            {section.label} ARCHIVES
                        </div>
                        <button
                            onClick={() => router.push(section.link)}
                            className="btn btn-secondary"
                            style={{ padding: '8px 24px', fontSize: '12px', letterSpacing: '1px' }}
                        >
                            SYNC_MANAGEMENT →
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '64px', padding: '48px' }}>
                <h3 className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px', marginBottom: '32px' }}>SYSTEM_HEALTH_LOGS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                    {[
                        { label: 'Global DB State', value: 'CONNECTED', status: 'OK' },
                        { label: 'Identity Protocol', value: 'SECURE_NODE', status: 'ACTIVE' },
                        { label: 'Storage Cluster', value: 'WRITABLE', status: 'READY' },
                    ].map(log => (
                        <div key={log.label} style={{ borderLeft: '1px solid var(--border)', paddingLeft: '24px' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{log.label}</div>
                            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{log.value}</div>
                            <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>[ STATUS: {log.status} ]</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
