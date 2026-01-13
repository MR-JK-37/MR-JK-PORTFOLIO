'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import ItemModal from '@/components/ItemModal';

export interface PortfolioItem {
    id: number;
    type: 'project' | 'achievement' | 'participation';
    title: string;
    shortDescription: string;
    fullDescription?: string;
    category: string;
    imageUrl?: string;
    attachments: {
        id: number;
        filePath: string;
        fileType: 'image' | 'video' | 'pdf';
        isPreview: boolean;
    }[];
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAdmin } = useAdmin();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/items?type=project');
                const data = await res.json();
                setProjects(data.items || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleSave = async (data: Partial<PortfolioItem>) => {
        const method = selectedItem ? 'PUT' : 'POST';
        const url = selectedItem ? `/api/items/${selectedItem.id}` : '/api/items';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, type: 'project' })
            });

            if (res.ok) {
                // Refresh list
                const refreshedRes = await fetch('/api/items?type=project');
                const refreshedData = await refreshedRes.json();
                setProjects(refreshedData.items || []);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(prev => prev.filter(p => p.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="container section">
            <header style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: '16px' }}>Project Archives</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                        A collection of technical deployments, from kernel-level optimizations to
                        immersive full-stack ecosystems.
                    </p>
                </div>
                {isAdmin && (
                    <button
                        className="btn btn-primary"
                        style={{ padding: '8px 16px' }}
                        onClick={() => { setSelectedItem(undefined); setIsModalOpen(true); }}
                    >
                        <span style={{ fontSize: '20px', lineHeight: 1 }}>+</span> Deploy New Project
                    </button>
                )}
            </header>

            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
                onSave={handleSave}
                type="project"
            />

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Scanning database...
                </div>
            ) : projects.length === 0 ? (
                <div className="glass-panel" style={{ padding: '100px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '24px', opacity: 0.5 }}>📂</div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No Projects Detected</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>The project archives are currently empty or encrypted.</p>
                </div>
            ) : (
                <div className="grid grid-3">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Preview Area */}
                            <div style={{ height: '200px', position: 'relative', background: '#000' }}>
                                {project.attachments.find(a => a.isPreview)?.filePath ? (
                                    <img
                                        src={project.attachments.find(a => a.isPreview)?.filePath}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', opacity: 0.2 }}>
                                        NO_MEDIA
                                    </div>
                                )}

                                {isAdmin && (
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '4px 8px', borderRadius: '4px' }}
                                            onClick={() => { setSelectedItem(project); setIsModalOpen(true); }}
                                        >
                                            ⋮
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '4px 8px', borderRadius: '4px', borderColor: 'rgba(255,0,0,0.3)', color: '#ff4444' }}
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}

                                <div style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '12px',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: 'var(--accent)',
                                    background: 'rgba(0,0,0,0.6)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--accent)'
                                }}>
                                    {project.category.toUpperCase()}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{project.title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                                    {project.shortDescription}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className="neon-text" style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                                        INIT_ACCESS →
                                    </button>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {project.attachments.slice(0, 3).map(att => (
                                            <div key={att.id} style={{ fontSize: '14px', opacity: 0.5 }}>
                                                {att.fileType === 'pdf' ? '📄' : att.fileType === 'video' ? '🎬' : '🖼️'}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
        </main>
    );
}
