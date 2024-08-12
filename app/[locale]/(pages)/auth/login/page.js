import React from 'react';
import Login from './Login';
import { AdminProvider } from '@/app/adminProvider';
//import Login from '../../../../components/adminPanel/Login/Login';

export default function LoginPage() {
  return (
    <AdminProvider>
      <div>
        <Login />
      </div>
    </AdminProvider>
  );
}

