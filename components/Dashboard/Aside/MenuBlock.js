import AsideItem from './AsideItem';
import { ContactsIcon, PetsIcon, SwitchCameraIcon, GroupIcon, SupervisedUserIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";


export default function MenuBlock() {

  const nestedData = [
    {'title': ' Поради', 'link': '/dashboard/advices'},
    {'title': 'FAQ', 'link': '/dashboard/faq'},
    {'title': 'Підсумки', 'link': '/dashboard/summaries'},
];

const dataList = [
  {'title': 'Контакти', 'icon': <ContactsIcon className={styles.icon}/>, 'href': '/dashboard/contacts'},
  {'title': 'Тварини', 'icon': <PetsIcon className={styles.icon}/>, 'href': '/dashboard/animals'},
  {'title': 'Партнери', 'icon': <SwitchCameraIcon className={styles.icon}/>, 'href': '/dashboard/partners'},
  {'title': 'Поради', 'icon': <GroupIcon className={styles.icon}/>, 'isNestedItems': true, 'nestedData': nestedData, 'href': '/'},
  {'title': 'Команда', 'icon': <SupervisedUserIcon className={styles.icon}/>, 'href': '/dashboard/our_team'},
];
  return (
    <div className={styles.main_menu}>
        <AsideItem
            itemStyle = {styles.item_header}
            titleStyle = {styles.header}
            title = "Головне меню"
        />

        {dataList.map((a) => {
            return (
                <div key = {a.icon}>
                    <AsideItem 
                        itemStyle = {styles.item}
                        titleStyle = {styles.title}
                        title = {a.title}
                        href = {a.href}
                        wrapperStyle={styles.wrapper}
                        isNestedItems={a.isNestedItems}
                        nestedData={a.isNestedItems ? a.nestedData : " "}
                    >
                        {a.icon}
                 </AsideItem>
                </div>
            )
        })}
    </div>
  )
}
