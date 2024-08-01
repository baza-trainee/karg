import React from 'react';
import AsideItem from './AsideItem';
import { useContext } from 'react';
import { AdminContext } from '@/app/adminProvider';
import { IdentityIcon, SupervisedUserIcon, HelpIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";


export default function SettingsBlock() {
    const { setActiveSection } = useContext(AdminContext);

    const dataList = [
        { 'title': 'Мій аккаунт', 'icon': <IdentityIcon className={styles.icon} />, 'href': '/dashboard/my_account' },
        { 'title': 'Команда', 'icon': <SupervisedUserIcon className={styles.icon} />, 'href': '/dashboard/our_team' },
        { 'title': 'Допомога', 'icon': <HelpIcon className={styles.icon} />, 'href': '/dashboard/support' },
    ];

    const handleItemClick = (section) => {
        setActiveSection(section);
    }

    return (
        <div className={styles.settings}>
            <AsideItem
                itemStyle={styles.item_header}
                titleStyle={styles.header}
                title="Налаштування"
            />

            {dataList.map((a) => {
                return (
                    <div key={a.title} onClick={() => handleItemClick(a.title)}>
                        <AsideItem
                            itemStyle={styles.item}
                            titleStyle={styles.title}
                            title={a.title}
                            wrapperStyle={styles.wrapper}
                            href={a.href}
                            handleItemClick={handleItemClick}
                        >
                            {a.icon}
                        </AsideItem>
                    </div>
                )
            })}
        </div>
    )
}
