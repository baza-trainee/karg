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

    useEffect(() => {
        if (isMounted && !accountId) {
            router.push('/auth/login');
        }
    }, [isMounted, accountId, router]);
    
    if (!isMounted) return <div style={{ display: 'none' }}></div>;
    return accountId ? children : null;
}
export default ProtectedRoute;
