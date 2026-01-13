'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { PortfolioItem } from '../projects/page';
import ItemModal from '@/components/ItemModal';

export default function ParticipationPage() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAdmin } = useAdmin();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch('/api/items?type=participation');
                const data = await res.json();
                setItems(data.items || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleSave = async (data: Partial<PortfolioItem>) => {
        const method = selectedItem ? 'PUT' : 'POST';
        const url = selectedItem ? `/api/items/${selectedItem.id}` : '/api/items';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, type: 'participation' })
            });

            if (res.ok) {
                const refreshedRes = await fetch('/api/items?type=participation');
                const refreshedData = await refreshedRes.json();
                setItems(refreshedData.items || []);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this operation?')) return;
        try {
            const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setItems(prev => prev.filter(p => p.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="container section">
            <header style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="section-title" style={{ marginBottom: '16px' }}>Network Operations</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
                        Active participation in hackathons, open-source cooperatives, and technical community events.
                    </p>
                </div>
                {isAdmin && (
                    <button
                        className="btn btn-primary"
                        style={{ padding: '8px 16px' }}
                        onClick={() => { setSelectedItem(undefined); setIsModalOpen(true); }}
                    >
                        <span style={{ fontSize: '20px', lineHeight: 1 }}>+</span> Log Operation
                    </button>
                )}
            </header>

            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
                onSave={handleSave}
                type="participation"
            />

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Scanning database...
                </div>
            ) : items.length === 0 ? (
                <div className="glass-panel" style={{ padding: '100px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '24px', opacity: 0.5 }}>🌐</div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No Operations Recorded</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>System shows no external network participation records.</p>
                </div>
            ) : (
                <div className="grid grid-3">
                    {items.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '32px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: 'var(--accent)',
                                    background: 'rgba(0, 200, 212, 0.1)',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--accent)'
                                }}>
                                    {item.category.toUpperCase()}
                                </span>
                                {isAdmin && (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '4px 8px', borderRadius: '4px' }}
                                            onClick={() => { setSelectedItem(item); setIsModalOpen(true); }}
                                        >
                                            ⋮
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '4px 8px', borderRadius: '4px', borderColor: 'rgba(255,0,0,0.3)', color: '#ff4444' }}
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {item.shortDescription}
                            </p>
                        </motion.article>
                    ))}
                </div>
            )}
        </main>
    );
}
