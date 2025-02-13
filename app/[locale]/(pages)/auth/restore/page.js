import React from 'react';
import RestoreUser from './Restore';
import { AdminProvider } from '@/app/adminProvider';

export default function RestoreUserPage() {
  return (
    <AdminProvider>
      <RestoreUser />
    </AdminProvider>
  )
}
