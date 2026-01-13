'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: 'folder' | 'trophy' | 'users' | 'file';
}

const icons = {
    folder: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
    trophy: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A2.25 2.25 0 0014.25 12h-4.5A2.25 2.25 0 007.5 14.25v4.5m9 0h-9M6 9a6 6 0 0112 0c0 1.657-2.686 3-6 3S6 10.657 6 9z',
    users: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
    file: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
};

export default function EmptyState({ title, description, icon = 'folder' }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
            style={{
                maxWidth: 320,
                margin: '0 auto',
                padding: 40,
                textAlign: 'center'
            }}
        >
            <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={icons[icon]} />
            </svg>

            <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>
                {title}
            </h4>

            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {description}
            </p>
        </motion.div>
    );
}
