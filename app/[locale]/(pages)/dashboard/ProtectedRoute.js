'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminContext } from '@/app/adminProvider';

const ProtectedRoute = ({ children }) => {
    const { accountId } = useContext(AdminContext);
    const router = useRouter();

    useEffect(() => {
        if (!accountId) {
            router.push('/auth/login');
        }
    }, [accountId, router]);

    return accountId ? children : null;
}
export default ProtectedRoute;
