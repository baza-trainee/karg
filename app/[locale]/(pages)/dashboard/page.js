'use client'

import Main from './Main/Main';
import { AdminProvider } from '@/app/adminProvider';
import { ModalProvider } from '@/app/ModalContext';
import { UnsavedChangesProvider } from '@/app/UnsavedChangesContext';
import GenericModal from "./GenericModal/GenericModal";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import { PetProvider } from './Pet/PetContext';
import { AdviceProvider } from './Advice/AdviceContext';
import { TeamProvider } from './OurTeam/TeamContext';
import { PartnerProvider } from './Partner/PartnerContext';
import { FAQProvider } from './FAQ/FAQContext';

export default function DashboardPage({ children }) {

  return (
    <AdminProvider>
      <ModalProvider>
        <UnsavedChangesProvider>
          <PartnerProvider>
            <PetProvider>
              <AdviceProvider>
                <FAQProvider>
                  <TeamProvider>
                    <div>
                      <Main />
                      {children}
                      <GenericModal />
                      <ConfirmationModal />
                    </div>
                  </TeamProvider>
                </FAQProvider>
              </AdviceProvider>
            </PetProvider>
          </PartnerProvider>
        </UnsavedChangesProvider>
      </ModalProvider>
    </AdminProvider>
  )
}
