'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<boolean>;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async (): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/check');
            const data = await res.json();
            setIsAdmin(data.isAuthenticated);
            return data.isAuthenticated;
        } catch {
            setIsAdmin(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsAdmin(false);
        } catch {
            console.error('Logout failed');
        }
    };

    useEffect(() => {
        let mounted = true;

        async function initAuth() {
            // We still verify status on load to sync UI, 
            // but the ENTRY must have been manual via /admin/gate
            try {
                await checkAuth();
            } catch (error) {
                console.error('Auth sync failed:', error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        initAuth();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <AdminContext.Provider value={{ isAdmin, isLoading, checkAuth, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
