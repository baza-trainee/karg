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
import HelpTab from "./Tabs/HelpTab";
import StatsTab from "./Tabs/StatsTab";

function HelpSidebar() {
    const { activeHelpSection, setActiveHelpSection } = useContext(AdminContext);

    function renderHelpSection() {
        switch (activeHelpSection) {
            case 'Загальні Питання':
                return <GeneralTab />
            case 'Вкладка Тварини':
                return <PetsTab />
            case 'Вкладка Партнери':
                return <PartnersTab />
            case 'Вкладка Поради':
                return <AdviceTab />
            case 'Вкладка FAQ':
                return <FAQTab />
            case 'Вкладка Підсумки':
                return <StatsTab />
            case 'Вкладка Мій акаунт':
                return <MyAccountTab />
            case 'Вкладка Команда':
                return <TeamTab />
            case 'Вкладка Допомога':
                return <HelpTab />
            default:
                return <GeneralTab />
        }
    }

    return (
        <div className={styles.helpLayout}>
            <div className={styles.helpSidebarWrapper}>
                <nav className={styles.helpSidebar}>
                    <ul>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Загальні Питання')}>Загальні Питання</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Тварини')}>Вкладка Тварини</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Партнери')}>Вкладка Партнери</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Поради')}>Вкладка Поради</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка FAQ')}>Вкладка FAQ</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Підсумки')}>Вкладка Підсумки</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Мій акаунт')}>Вкладка Мій акаунт</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Команда')}>Вкладка Команда</button></li>
                        <li><button className={styles.button} onClick={() => setActiveHelpSection('Вкладка Допомога')}>Вкладка Допомога</button></li>
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