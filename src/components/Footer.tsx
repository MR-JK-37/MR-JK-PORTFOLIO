'use client';

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', padding: '64px 0', marginTop: '100px' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent)', marginBottom: '8px' }}>
                        MR!JK!
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        © 2026 ELITE SYSTEM ARCHITECT
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '32px' }}>
                    {[
                        { label: 'GitHub', href: 'https://github.com/mrjk' },
                        { label: 'LinkedIn', href: 'https://linkedin.com/in/mrjk' },
                        { label: 'Twitter', href: 'https://twitter.com/mrjk' },
                    ].map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
