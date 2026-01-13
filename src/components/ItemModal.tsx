'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Attachment {
    id: number;
    filePath: string;
    fileType: 'image' | 'video' | 'pdf';
    isPreview: boolean;
}

export interface PortfolioItem {
    id: number;
    type: 'project' | 'achievement' | 'participation';
    title: string;
    shortDescription: string;
    fullDescription?: string;
    category: string;
    imageUrl?: string;
    attachments: Attachment[];
}

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: PortfolioItem;
    onSave: (data: Partial<PortfolioItem>) => void;
    type: 'project' | 'achievement' | 'participation';
}

export default function ItemModal({ isOpen, onClose, item, onSave, type }: ItemModalProps) {
    const [title, setTitle] = useState(item?.title || '');
    const [category, setCategory] = useState(item?.category || '');
    const [shortDescription, setShortDescription] = useState(item?.shortDescription || '');
    const [fullDescription, setFullDescription] = useState(item?.fullDescription || '');
    const [attachments, setAttachments] = useState<Attachment[]>(item?.attachments || []);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);

        const files = Array.from(e.target.files);
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();

                if (res.ok) {
                    setAttachments(prev => [...prev, {
                        id: Math.random(), // Temporary ID until save
                        filePath: data.filePath,
                        fileType: data.fileType,
                        isPreview: prev.length === 0
                    } as Attachment]);
                } else {
                    console.error('Upload failed:', data.error);
                    alert(`Upload failed: ${data.details || data.error}`);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                alert('Connection to upload server failed.');
            }
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = () => {
        onSave({
            title,
            category,
            shortDescription,
            fullDescription,
            attachments,
            type
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="glass-panel w-full max-w-2xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <header style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="neon-text" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '2px' }}>
                            {item ? 'EDIT_MODULE' : 'INITIALIZE_MODULE'} [{type.toUpperCase()}]
                        </h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}>×</button>
                    </header>

                    <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
                        <div style={{ display: 'grid', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Module Title</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} className="glass-card" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--border)', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Classification</label>
                                    <input value={category} onChange={e => setCategory(e.target.value)} className="glass-card" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--border)', outline: 'none' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Abstract (Short Description)</label>
                                <textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} style={{ width: '100%', height: '80px', padding: '12px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--border)', outline: 'none', borderRadius: '8px', resize: 'none' }} />
                            </div>

                            {type === 'project' && (
                                <div>
                                    <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Detailed Documentation</label>
                                    <textarea value={fullDescription} onChange={e => setFullDescription(e.target.value)} style={{ width: '100%', height: '120px', padding: '12px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--border)', outline: 'none', borderRadius: '8px', resize: 'none' }} />
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase' }}>Attachments (Media/Docs)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                                    {attachments.map((att, i) => (
                                        <div key={i} className="glass-card" style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
                                            {att.fileType === 'image' ? (
                                                <img src={att.filePath} alt={`Attachment ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : att.fileType === 'video' ? (
                                                <video src={att.filePath} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'rgba(255,255,255,0.05)' }}>
                                                    📄
                                                </div>
                                            )}
                                            <button
                                                onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))}
                                                style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 10, cursor: 'pointer' }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="glass-card"
                                        style={{ height: '80px', border: '1px dashed var(--accent)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}
                                    >
                                        +
                                    </button>
                                </div>
                                <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
                                {uploading && <div style={{ fontSize: '10px', color: 'var(--accent)' }}>Uploading Data Stream...</div>}
                            </div>
                        </div>
                    </div>

                    <footer style={{ padding: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button onClick={onClose} className="btn btn-secondary">ABORT</button>
                        <button onClick={handleSave} className="btn btn-primary">SAVE_MODIFICATIONS</button>
                    </footer>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
