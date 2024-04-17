import React from 'react';
import Login from './Login';
import { AdminContext } from '@/app/adminProvider';
//import Login from '../../../../components/adminPanel/Login/Login';

export default function LoginPage() {
  return (
    <AdminContext>
      <div><Login /></div>
    </AdminContext>
  );
}
