'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminContext } from '@/app/adminProvider';
import { useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const { accountId } = useContext(AdminContext);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

    const checkAuth = () => {
        const storedToken = localStorage.getItem('auth-token');
        const storedAccountId = localStorage.getItem('accountId');
        return (storedToken && storedAccountId);
    }

    useEffect(() => {
        if (isMounted && !checkAuth()) {
            router.push('/auth/login');
        }
    }, [isMounted, router]);

    if (!isMounted) return <div style={{ display: 'none' }}></div>;
    return accountId ? children : null;
}
export default ProtectedRoute;
