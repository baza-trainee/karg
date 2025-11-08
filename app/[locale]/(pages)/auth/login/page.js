'use client'
import React from 'react';
import Login from './Login';
import { AdminProvider } from '@/app/adminProvider';

export default function LoginPage() {
  return (
    <AdminProvider>
      <div>
        <Login />
      </div>
    </AdminProvider>
  );
}

