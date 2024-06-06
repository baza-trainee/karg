'use client'

import Main from './Main/Main';
import { AdminProvider } from '@/app/adminProvider';
import { ModalProvider } from '@/app/ModalContext';
import { UnsavedChangesProvider } from '@/app/UnsavedChangesContext';
import GenericModal from "./GenericModal/GenericModal";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import { PetProvider } from './Pet/PetContext';

export default function DashboardPage({ children }) {

  return (
    <AdminProvider>
      <ModalProvider>
        <UnsavedChangesProvider>
          <PetProvider>
            <div>
              <Main />
              {children}
              <GenericModal />
              <ConfirmationModal />
            </div>
          </PetProvider>
        </UnsavedChangesProvider>
      </ModalProvider>
    </AdminProvider>
  )
}
