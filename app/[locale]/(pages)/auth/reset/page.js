import React from 'react';
import ResetPassword from './Reset';
import { AdminProvider } from '@/app/adminProvider';

export default function ResetPasswordPage() {
  return (
    <AdminProvider>
      <ResetPassword />
    </AdminProvider>
  )
}
