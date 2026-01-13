'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddItemForm({ onSuccess }: { onSuccess: () => void }) {
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [fullDesc, setFullDesc] = useState('');
    const [category, setCategory] = useState('project');
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            const uploadedAttachments = [];

            // Upload files sequentially
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();

                if (res.ok) {
                    uploadedAttachments.push({
                        file_path: data.url,
                        file_type: data.type.startsWith('image') ? 'image' : 'video',
                        is_preview: uploadedAttachments.length === 0 // First one is preview
                    });
                }
            }

            // Create Item
            const itemRes = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    short_description: shortDesc,
                    full_description: fullDesc,
                    category,
                    attachments: uploadedAttachments
                })
            });

            if (itemRes.ok) {
                setTitle('');
                setShortDesc('');
                setFullDesc('');
                setFiles([]);
                onSuccess();
            }

        } catch (error) {
            console.error(error);
            alert('Failed to create item');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="glass-panel p-6 mt-8">
            <h3 className="text-xl neon-text mb-4">ADD NEW ENTRY</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    placeholder="TITLE"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--neon-blue)] outline-none"
                    required
                />
                <input
                    placeholder="SHORT DESCRIPTION (Preview)"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--neon-blue)] outline-none"
                    required
                />
                <textarea
                    placeholder="FULL DESCRIPTION (Markdown supported)"
                    value={fullDesc}
                    onChange={(e) => setFullDesc(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--neon-blue)] outline-none h-32"
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--neon-blue)] outline-none"
                >
                    <option value="project">PROJECT</option>
                    <option value="achievement">ACHIEVEMENT</option>
                    <option value="participation">PARTICIPATION</option>
                </select>

                <div className="border border-dashed border-gray-600 p-4 text-center cursor-pointer hover:border-[var(--neon-blue)] transition-colors">
                    <input
                        type="file"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) setFiles(Array.from(e.target.files));
                        }}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer block">
                        {files.length > 0 ? `${files.length} FILES SELECTED` : 'CLICK TO UPLOAD ATTACHMENTS'}
                    </label>
                </div>

                <motion.button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 bg-[var(--neon-blue)] text-black font-bold hover:opacity-90 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {uploading ? 'UPLOADING DATA...' : 'EXECUTE UPLOAD'}
                </motion.button>
            </form>
        </div>
    );
}
