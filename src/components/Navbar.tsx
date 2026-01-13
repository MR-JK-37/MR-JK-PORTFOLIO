'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';

const links = [
    { href: '/home', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/participation', label: 'Participation' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { isAdmin, isLoading } = useAdmin();

    // Hide navbar on entry page
    if (pathname === '/') return null;

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '8px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            maxWidth: '1100px',
            width: 'calc(100% - 48px)',
            margin: '0 auto'
        }}>
            <Link href="/home" style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '-1px'
            }}>
                MR!JK!
            </Link>

            <div style={{ display: 'flex', gap: '24px', flex: 1, justifyContent: 'center' }}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                            position: 'relative'
                        }}
                    >
                        {link.label}
                        {pathname === link.href && (
                            <motion.div
                                layoutId="nav-underline"
                                style={{
                                    position: 'absolute',
                                    bottom: -4,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    background: 'var(--accent)',
                                    boxShadow: '0 0 10px var(--accent-glow)'
                                }}
                            />
                        )}
                    </Link>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {!isLoading && isAdmin && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="neon-text"
                        style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            background: 'rgba(0, 200, 212, 0.1)',
                            padding: '4px 8px',
                            border: '1px solid var(--accent)',
                            borderRadius: '4px'
                        }}
                    >
                        ADMIN
                    </motion.span>
                )}

                <Link href="/resume" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                    Resume
                </Link>

                <Link
                    href="/admin/gate"
                    className="glass-card"
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isAdmin ? 'var(--accent)' : 'var(--text-muted)',
                        fontSize: '16px',
                        padding: 0,
                        border: isAdmin ? '1px solid var(--accent)' : '1px solid var(--border)',
                        boxShadow: isAdmin ? '0 0 10px var(--accent-glow)' : 'none'
                    }}
                >
                    👤
                </Link>
            </div>
        </nav>
    );
}
