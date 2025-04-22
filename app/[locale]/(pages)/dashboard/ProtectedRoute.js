'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminContext } from '@/app/adminProvider';
import { useState } from 'react';
import  ModalContext  from '@/app/ModalContext';
import handleForbiddenAccess from './handleForbiddenAccess';

const ProtectedRoute = ({ children }) => {
    const { accountId, logoutDependencies } = useContext(AdminContext);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { showModal } = useContext(ModalContext);

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

    useEffect(() => {
        const handleStorageListener = (e) => {
            if (e.key === 'auth-token' && e.newValue === null) {
                handleForbiddenAccess(router, showModal, logoutDependencies);
            }
        }
        window.addEventListener('storage', handleStorageListener);
        return () => {
            window.removeEventListener('storage', handleStorageListener);
        }
    }, [])

    if (!isMounted) return <div style={{ display: 'none' }}></div>;
    return accountId ? children : null;
}
export default ProtectedRoute;
