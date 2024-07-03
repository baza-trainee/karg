import AsideItem from './AsideItem';
import { useContext } from 'react';
import { AdminContext } from '@/app/adminProvider';
import { ContactsIcon, PetsIcon, SwitchCameraIcon, GroupIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";

export default function MenuBlock() {
  const { setActiveSection } = useContext(AdminContext);

  const handleItemClick = (section) => {
    setActiveSection(section);
  }

  const nestedData = [
    { 'title': 'Поради', 'href': '/dashboard/advices' },
    { 'title': 'FAQ', 'href': '/dashboard/faq' },
    { 'title': 'Підсумки', 'href': '/dashboard/summaries' },
  ];

  const dataList = [
    { 'title': 'Контакти', 'icon': <ContactsIcon className={styles.icon} />, 'href': '/dashboard/contacts' },
    { 'title': 'Тварини', 'icon': <PetsIcon className={styles.icon} />, 'href': '/dashboard/animals' },
    { 'title': 'Партнери', 'icon': <SwitchCameraIcon className={styles.icon} />, 'href': '/dashboard/partners' },
    { 'title': 'Корисне', 'icon': <GroupIcon className={styles.icon} />, 'isNestedItems': true, 'nestedData': nestedData, 'href': '/' },
  ];
  return (
    <div className={styles.aside_menu}>
      <AsideItem
        itemStyle={styles.item_header}
        titleStyle={styles.header}
        title="Головне меню"
      />

      {dataList.map((a) => {
        return (
          <div key={a.title} onClick={(a.title !== 'Корисне') ? () => handleItemClick(a.title) : () => { }}>
            <AsideItem
              itemStyle={styles.item}
              titleStyle={styles.title}
              title={a.title}
              wrapperStyle={styles.wrapper}
              isNestedItems={a.isNestedItems}
              nestedData={a.isNestedItems ? a.nestedData : " "}
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
