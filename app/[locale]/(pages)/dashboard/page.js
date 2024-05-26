'use client'

import Main from './Main/Main';
import { AdminProvider } from '@/app/adminProvider';
import { ModalProvider } from '@/app/ModalContext';
import { UnsavedChangesProvider } from '@/app/UnsavedChangesContext';
import GenericModal from './GenericModal';
import ConfirmationModal from './ConfirmationModal';

export default function DashboardPage({ children }) {

  return (
    <AdminProvider>
      <ModalProvider>
        <UnsavedChangesProvider>
          <div>
            <Main />
            {children}
            <GenericModal />
            <ConfirmationModal />
          </div>
        </UnsavedChangesProvider>
      </ModalProvider>
    </AdminProvider>
  )
}
