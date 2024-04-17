'use client'

import React from 'react';
import Main from './Main/Main';
import { AdminProvider } from '@/app/adminProvider';

export default function DashboardPage({ children }) {
  return (
    <AdminProvider>
      <div>
        <Main />
        {children}
      </div>
    </AdminProvider>
  )
}
