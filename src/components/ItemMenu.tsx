'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ItemMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    onAttachments?: () => void;
}

export default function ItemMenu({ onEdit, onDelete, onAttachments }: ItemMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,200,212,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0,200,212,0.3)';
                    e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                }}
            >
                ⋮
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -5 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '4px',
                            background: 'rgba(12,12,16,0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            padding: '4px',
                            minWidth: '140px',
                            zIndex: 100,
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <MenuItem icon="✎" label="Edit" onClick={() => { onEdit(); setOpen(false); }} />
                        <MenuItem icon="🗑" label="Delete" onClick={() => { onDelete(); setOpen(false); }} danger />
                        {onAttachments && (
                            <MenuItem icon="📎" label="Attachments" onClick={() => { onAttachments(); setOpen(false); }} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MenuItem({ icon, label, onClick, danger }: { icon: string; label: string; onClick: () => void; danger?: boolean }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: danger ? '#ff6b6b' : 'var(--text-primary)',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background 0.15s',
                textAlign: 'left',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = danger ? 'rgba(255,107,107,0.1)' : 'rgba(0,200,212,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
            }}
        >
            <span style={{ fontSize: '12px' }}>{icon}</span>
            {label}
        </button>
    );
}
