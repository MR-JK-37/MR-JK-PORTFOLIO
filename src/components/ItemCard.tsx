'use client';

import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import ItemMenu from './ItemMenu';

interface ItemCardProps {
    id: number;
    title: string;
    shortDescription: string;
    category?: string;
    imageUrl?: string;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onAttachments?: () => void;
}

export default function ItemCard({
    title,
    shortDescription,
    category,
    imageUrl,
    onClick,
    onEdit,
    onDelete,
    onAttachments,
}: ItemCardProps) {
    const { isAdmin, isLoading } = useAdmin();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="glass-card"
            style={{
                overflow: 'hidden',
                cursor: onClick ? 'pointer' : 'default',
                position: 'relative',
                borderRadius: '12px',
            }}
            onClick={onClick}
        >
            {/* Admin Menu */}
            {!isLoading && isAdmin && (onEdit || onDelete) && (
                <div
                    className="admin-controls"
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 10,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ItemMenu
                        onEdit={onEdit || (() => { })}
                        onDelete={onDelete || (() => { })}
                        onAttachments={onAttachments}
                    />
                </div>
            )}

            {/* Image Preview */}
            <div
                style={{
                    height: '160px',
                    width: '100%',
                    background: imageUrl
                        ? `url(${imageUrl}) center/cover no-repeat`
                        : 'linear-gradient(135deg, rgba(0,200,212,0.05), rgba(0,200,212,0.02))',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {!imageUrl && (
                    <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>
                            {category?.toLowerCase().includes('video') ? '▶' : '⚡'}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
                {category && (
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                            background: 'rgba(0,200,212,0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            marginBottom: '12px',
                        }}
                    >
                        {category}
                    </span>
                )}

                <h3
                    style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {shortDescription}
                </p>

                {onClick && (
                    <div
                        style={{
                            marginTop: '16px',
                            fontSize: '13px',
                            color: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        View details →
                    </div>
                )}
            </div>
        </motion.div>
    );
}
