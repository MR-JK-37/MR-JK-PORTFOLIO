'use client';

import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';

interface SectionHeaderProps {
    title: string;
    onAdd?: () => void;
}

export default function SectionHeader({ title, onAdd }: SectionHeaderProps) {
    const { isAdmin, isLoading } = useAdmin();

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
        }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
                {title}
            </h2>

            {!isLoading && isAdmin && onAdd && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAdd}
                    style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,200,212,0.1)',
                        border: '1px solid rgba(0,200,212,0.3)',
                        borderRadius: '8px',
                        color: 'var(--accent)',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,200,212,0.2)';
                        e.currentTarget.style.borderColor = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,200,212,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(0,200,212,0.3)';
                    }}
                >
                    +
                </motion.button>
            )}
        </div>
    );
}
