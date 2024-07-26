'use client'

import Main from './Main/Main';
import { AdminProvider } from '@/app/adminProvider';
import { ModalProvider } from '@/app/ModalContext';
import { UnsavedChangesProvider } from '@/app/UnsavedChangesContext';
import GenericModal from "./GenericModal/GenericModal";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import { PetProvider } from './Pet/PetContext';
import { AdviceProvider } from './Advice/AdviceContext';
import { PartnerProvider } from './Partner/PartnerContext';

export default function DashboardPage({ children }) {

  return (
    <AdminProvider>
      <ModalProvider>
        <UnsavedChangesProvider>
          <PartnerProvider>
            <PetProvider>
              <AdviceProvider>
              <div>
                <Main />
                {children}
                <GenericModal />
                <ConfirmationModal />
                </div>
              </AdviceProvider>
            </PetProvider>
          </PartnerProvider>
        </UnsavedChangesProvider>
      </ModalProvider>
    </AdminProvider>
  )
}
