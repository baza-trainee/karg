import styles from "./styles/helpSideBar.module.scss";
import { useContext } from "react";
import { AdminContext } from '@/app/adminProvider';
import GeneralTab from "./Tabs/GeneralTab";
import PetsTab from "./Tabs/PetsTab";
import PartnersTab from "./Tabs/PartnersTab";
import AdviceTab from "./Tabs/AdviceTab";
import FAQTab from "./Tabs/FAQTab";
import MyAccountTab from "./Tabs/MyAccountTab";
import TeamTab from "./Tabs/TeamTab";
import StatsTab from "./Tabs/StatsTab";
import ContactTab from "./Tabs/ContactTab";

function HelpSidebar() {
    const { activeHelpSection, setActiveHelpSection } = useContext(AdminContext);

    function renderHelpSection() {
        switch (activeHelpSection) {
            case 'Контакти та статистичні дані':
                return <ContactTab />
            case 'Загальні Питання':
                return <GeneralTab />
            case 'Тварини':
                return <PetsTab />
            case 'Партнери':
                return <PartnersTab />
            case 'Поради':
                return <AdviceTab />
            case 'FAQ':
                return <FAQTab />
            case 'Підсумки':
                return <StatsTab />
            case 'Мій акаунт':
                return <MyAccountTab />
            case 'Команда':
                return <TeamTab />
            default:
                return <GeneralTab />
        }
    }

    return (
        <div className={styles.helpLayout}>
            <div className={styles.helpSidebarWrapper}>
                <nav className={styles.helpSidebar}>
                    <ul>
                        <li className={activeHelpSection === 'Загальні Питання' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Загальні Питання')}>
                                Загальні Питання
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Контакти та статистичні дані' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Контакти та статистичні дані')}>
                                Контакти та статистичні дані
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Тварини' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Тварини')}>
                                Тварини
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Партнери' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Партнери')}>
                                Партнери
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Поради' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Поради')}>
                                Поради
                            </button>
                        </li>
                        <li className={activeHelpSection === 'FAQ' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('FAQ')}>
                                FAQ
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Підсумки' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Підсумки')}>
                                Підсумки
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Мій акаунт' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Мій акаунт')}>
                                Мій акаунт
                            </button>
                        </li>
                        <li className={activeHelpSection === 'Команда' ? styles.active : ''}>
                            <button
                                className={styles.button}
                                onClick={() => setActiveHelpSection('Команда')}>
                                Команда
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.helpContent}>
                {renderHelpSection()}
            </div>
        </div>
    )
}
export default HelpSidebar;