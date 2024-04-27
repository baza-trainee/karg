'use client'

import { useState, useContext } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import { Phill, Snowball, Paspertu, Oblina, Mirtl, Lada, Kostya, Gosha, Cottage, Bilyash } from '@/public/assets/images/pets';
import variables from '../../../../variables.module.scss';
import styles from "./styles/petList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import PetItem from "./PetItem";
import Pagination from '../../Pagination/Pagination';
import CategorySelector from "../CategorySelector/CategorySelector";
import ModalContext from '@/app/ModalContext';
import PetForm from '../PetForm/PetForm';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const petData = [
    { "id": 1, "petCategory": "Собаки", "photoSrc": Phill, "photoAlt": "Pill-dog", "petNameUa": "Філя", "petDetailsUa": "Філя, наш аксакал.  Дата народження  10.01.2008р. Філі 16 рочків і як всі старенькі він спокійний, більшість часу лежить на своєму м'якому місці та дрімає.  Дуже любить смачненьке і ненавидить грумінг. Потребує регулярного лікування та курсів прийому препаратів.  На пожиттєвому кураторстві команди.", "rescueStoryUa": "На початку повномасштабного вторгнення диспетчеру подзвонила бабуся, що евакуювалась за кордон до дітей, і попросила терміново прихистити її чотирнадцятирічного сліпого пуделя. Ми не змогли відмовити Філі у прихистку, і він переїхав на кураторство команди з паспортом і запискою про хронічні хвороби та харчові вподобання." },
    { "id": 2, "petCategory": "Собаки", "photoSrc": Snowball, "photoAlt": "Snowball-dog", "petNameUa": "Сніжок", "petDetailsUa": "Молодий песик, що мав померти, але вижив.  Рік народження: 2022. Сніжок лякливий спокійний песик, дружній з іншими собаками і котиками.  Чекає людей, котрі приймуть в сім'ю собаку-інсультника, розуміючи, що слідкувати за здоров'ям такої собаки треба прискіпливо та періодично водити на повне обстеження.", "rescueStoryUa": "Увечері  близько 23 години до Команди порятунку звернулися люди, що помітили, як на проспекті Перемоги машина збила цуценя. Зі слів свідків, водій вийшов з авто, поглянув на травмовану собаку 🐕 та поїхав далі.  Черговий екіпаж виїхав на місце події. Цуценя лежало на узбіччі дороги та скавучало.  У Сніжка були діагностовані численні перелами задніх кінцівок, а також тазу. А потім стався інсульт." },
    { "id": 3, "petCategory": "Собаки", "photoSrc": Cottage, "photoAlt": "Cottage-dog", "petNameUa": "Сирок", "petDetailsUa": "Невеличкий добрий песик. Орієнтовний рік народження: 2013 Сирок невеличкий песик у віці,дружелюбний та зворушливий, орієнтований на людину. Дуже чуттєвий і емоційний, гостро реагує на стресові ситуації.  Милий, тихий, доброзичливий. Дружній до всіх тварин. Ідеальний компаньйон для людей, що ведуть не надто активне життя.", "rescueStoryUa": "До нас надійшла інформація про збиту в Борисполі собачку.  Сирок потрапив на кураторство команди з серйозними травмами, дирофіляріозом і епілепсією. Після лікування почувається добре, але потребує пожиттєвого прийому препаратів." },
    { "id": 4, "petCategory": "Коти", "photoSrc": Paspertu, "photoAlt": "Paspertu-cat", "petNameUa": "Паспурту", "petDetailsUa": "Орієнтовний рік народження: 2020  Великий та пухнастий комочок щастя. Паспарту добре ладнає з іншими котами, проте має і свій неповторний та твердий характер. Любить гладитись та сидіти на ручках. Зараз Паспарту цілком здоровий, кастрований, оброблений від паразитів. Пухнастик знаходиться на перетримці та дуже мріє все ж зустріти свою людину. Можливо, це саме ви?", "rescueStoryUa": "12 жовтня 2021 року до Команди порятунку звернувся працівник Фори із проханням допомогти з госпіталізацією хворого кота, який лежить у них під магазином. На місці зв'язатися із заявником не вдалося, але на палісаднику рятувальники виявили кота. Він відповз на пару метрів і сидів, уткнувшись мордою в асфальт, не реагував на зовнішні подразники. Госпіталізовано під кураторство Команди. Названо Паспарту По первинному огляду виявлено новоутворення у роті. У кота гіперплазія тканин ясен та голосової щілини. Розростання тканин заважає коту не лише їсти, навіть дихати. Ми не змогли відмовити Філі у прихистку, і він переїхав на кураторство команди з паспортом і запискою про хронічні хвороби та харчові вподобання. " },
    { "id": 5, "petCategory": "Собаки", "photoSrc": Oblina, "photoAlt": "Oblina-dog", "petNameUa": "Обліна", "petDetailsUa": "Не молода собачка з інвалідністю. Орієнтовний рік народження: 2015 Обліна спокійна соціальна собачка, швидко звикає до людей, дружня з тваринами.  Напівсліпа, кульгає після травми на одну лапку.  Дуже хоче дожити своє в минулому не просте вуличне  життя домашньою собакою.", "rescueStoryUa": "Її збила автівка в районі Броварів, собака від переляку втекла на промзону найближчого підприємства, де її помітив робітник та не зміг пройти осторонь. Він викликав нашу команду. Приїхавши на місце, екіпаж побачив собаку в жахливому стані, вона лежала, поскулювала, а око її випадало. При обстеженні ветеринари виявили перелом тазу та лапи. Око бідолашної не змогли врятувати, тому довелося видалити. На одній тазовій кінцівці відсутня ГБЧ." },
    { "id": 6, "petCategory": "Собаки", "photoSrc": Mirtl, "photoAlt": "Mirtl-dog", "petNameUa": "Міртл", "petDetailsUa": "Собака, що ніколи не знала домашнього тепла . Орієнтовний рік народження: 2019 Міртл - молода собака, що прекрасно спілкується з усіма тваринами і зовсім не довіряє людям. За майже півроку життя на перетримці повністю не соціалізувалась. Ідеальним для неї був би приватний, добре огороджений будинок і люди, що розуміють проблему та готові запастись терпінням.", "rescueStoryUa": "Її знайшла лежачою на дорозі поблизу Гнідина велосипедистка. Відтягнула на узбіччя та подзвонила в КАРГ. Міртл не ходила, в тілі виявлено три кулі. На диво жодна куля не зачепила життєво важливих органів, тож після курсу інтенсивної терапії Міртл повністю відновилась." },
    { "id": 7, "petCategory": "Собаки", "photoSrc": Lada, "photoAlt": "Lada-dog", "petNameUa": "Лада", "petDetailsUa": "Молода собачка, метис вівчарки. Дата народження: липень 2022  Ладушка активна і весела собачка, дружня до інших тварин. Соціальна, орієнтована на людину.  Дуже чекає на своїх людей, трохи терпіння та занять з дресури - і буде ідеальною собакою.", "rescueStoryUa": "Лада - одна з щенят, котрих народила вагітна з кульовим пораненням вівчарка, взята командою на кураторство на початку повномасштабного вторгнення. Братиків і сестричок прилаштували, мама теж давно знайшла дім, а Ладушка все чекає, коли за нею приїдуть і заберуть в сім'ю." },
    { "id": 8, "petCategory": "Собаки", "photoSrc": Kostya, "photoAlt": "Kostya-dog", "petNameUa": "Костя", "petDetailsUa": "Зворушливий старенький дідусь. Орієнтовна дата народження: 2011 р. Костя милий старий песик, що ніколи не знав домашнього тепла.   Радіє смаколикам і м'якому матрасику біля батареї. Встав на лапи, ходить не швидко, але впевнено. Потребує особливого догляду, залишається на пожиттєвому кураторстві команди.", "rescueStoryUa": "Костя був госпіталізований черговим екіпажем командині з вулиці Вишгороду, як збитий автівкою.  Виявилось, що автотравми не було, пес дуже віковий, не ходить, з сімома кулями в тілі та пухлиною, проте не факт, що переживе операцію.  Дізнавшись це, куратори хотіли евтаназувати старого, тож команда взяла Костю під свою опіку. Операція пройшла успішно. Пухлина, котру видалили, виявилась доброякісною." },
    { "id": 9, "petCategory": "Собаки", "photoSrc": Gosha, "photoAlt": "Gosha-dog", "petNameUa": "Гоша", "petDetailsUa": "Орієнтовний рік народження 2014. Гоша, як більшість собачок у віці, спокійна і досить врівноважена. Дружня до котиків. Має проблеми з серцем та гемангіоперицитому. Чекає особливих людей, котрі погодяться взяти в сім'ю вікову собаку з хронічними проблемами зі здоров'ям.", "rescueStoryUa": "Диспетчеру команди зателефонували з поліції з приводу травмованої собаки у Голосіївському районі. Найімовірніше, вона була травмована внаслідок чергових обстрілів міста. Бідосю шпиталізували та назвали Гоша.   При огляді виявлено контузію та осколкове поранення передньої правої кінцівки. Собака мала проблеми з наднирниками, печінкою та сечовипусканням." },
    { "id": 10, "petCategory": "Коти", "photoSrc": Bilyash, "photoAlt": "Bilyash-cat", "petNameUa": "Біляш", "petDetailsUa": "Ласкавий та пухнастий. Орієнтовний рік народження: 2022 Неймовірно красивий кіт Біляшик ще зовсім юний. Охоче грається, але інколи може булити інших котів. Територіальні війни, як ніяк. Біляш надзвичайно ласкавий, тому регулярна кототерапія вам забезпечена. Котик дуже любить знаходитись поряд з людиною, муркотати та лежати на ручках", "rescueStoryUa": "В липні 2023 р. наш рятувальник, повертаючись після зміни додому, побачив кота на дорозі та не зміг проїхати повз. У клініці в Біляша виявили травму кульшової кістки та забиття печінки. Зараз кіт повністю здоровий, кастрований та привчений до лотка." },
];

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelText: 'Скасувати',
    confirmText: 'Видалити'
};

const handleConfirmDelete = (pet) => {
    console.log(`request for deleting id: ` + pet.id);
}

export default function PetList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('Найновіші');
    const pageSize = 10;
    const totalPages = Math.ceil(petData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const categories = ['Коти', 'Собаки', 'Інші тварини'];
    const filteredData = petData.filter(pet => selectedCategory === 'Найновіші' || pet.petCategory === selectedCategory);
    const currentData = filteredData.slice(startIndex, startIndex + pageSize);
    const { confirmationTitle, message, cancelText, confirmText } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);

    return (
        <div className={styles.container}>
            <div className={styles.petTitle}>
                <p className={`${styles.photo} ${variables.font20w700}`}>Фото</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Імʼя</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Категорія</p>
                <p className={`${styles.detailsInfo} ${variables.font20w700}`}>Опис</p>
                <p className={`${styles.detailsTitle} ${variables.font20w700}`}>Історія порятунку</p>
                <CategorySelector categories={categories} selectedCategory={selectedCategory} onSelectedCategory={setSelectedCategory} />
            </div>
            {currentData.map((pet) => {
                return (
                    <PetItem
                        key={pet.petNameUa}
                        petLineStyle={styles.petLine}
                        photoStyle={styles.photo}
                        photoSrc={pet.photoSrc}
                        photoAlt={pet.photoAlt}
                        basicInfoStyle={styles.basicInfo}
                        petName={pet.petNameUa}
                        petCategory={pet.petCategory}
                        petDetails={pet.petDetailsUa}
                        detailsStyle={styles.detailsInfo}
                        detailsBlockStyle={styles.detailsInfoBlock}
                        rescueStory={pet.rescueStoryUa}
                        iconsContainerStyle={styles.iconsContainer}
                    >
                        <CreateIcon
                            className={styles.create_icon}
                            onClick={() => showModal('generic', <PetForm type='edit' petData={pet} />)}
                        />
                        <TrashIcon
                            className={styles.trash_icon}
                            onClick={() => showModal('confirmation',
                                <ConfirmationDialog
                                    confirmationTitle={confirmationTitle}
                                    message={message}
                                    cancelText={cancelText}
                                    confirmText={confirmText}
                                    onConfirm={() => handleConfirmDelete(pet)}
                                    onCancel={() => console.log('cancellation delete')}
                                    leftButtonStyle={stylesBtn.confirmationCancelBtn}
                                    rightButtonStyle={stylesBtn.confirmationDeleteBtn}
                                />)}
                        />
                    </PetItem>
                )
            })}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    )
}
