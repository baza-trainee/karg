'use client'

import { useContext, useEffect, memo } from 'react';
import { CreateIcon, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/contactList.module.scss";
import ContactItem from "./ContactItem";
import ModalContext from '@/app/ModalContext';
import ContactForm from '../ContactForm/ContactForm';
import Spinner from '@/components/Spinner/Spinner';
import { ContactContext } from "../ContactContext";
import { FacebookRound, InstagramRound, EmailIcon, LocationIcon, PhoneIcon, TelegramRound, SquirrelIcon } from '@/public/assets/icons/index';

const categoryLabels = {
    'PhoneNumber': [
        'Номер телефону 1',
        'Номер телефону 2'
    ],
    'Email': 'Електронна пошта',
    'Location': 'Розташування',
    'Instagram': 'Instagram',
    'Facebook': 'Facebook',
    'Telegram': 'Telegram',
    'Statistics': [
        'Тварин врятовано',
        'Тварин евакуйовано з зони бойових дій',
        'Виїздів на рік',
        'Видів тварин врятовано'
    ],
};

const categoryIcons = {
    'PhoneNumber': <PhoneIcon />,
    'Email': <EmailIcon />,
    'Location': <LocationIcon />,
    'Instagram': <InstagramRound />,
    'Facebook': <FacebookRound />,
    'Telegram': <TelegramRound />,
    'Statistics': <SquirrelIcon />,
}

function ContactList() {
    const {
        loadAllContacts,
        isLoading,
        contact,
    } = useContext(ContactContext);
    const { showModal } = useContext(ModalContext);

    useEffect(() => {
        if (!isLoading) {
            loadAllContacts();
        }
    }, [loadAllContacts]);

    const locationUaItem = contact.find(item => item.category === 'LocationUa');
    const locationEnItem = contact.find(item => item.category === 'LocationEn');
    const locationItem = (locationUaItem || locationEnItem) ? {
        id: 'combined location',
        category: 'Location',
        idUa: locationUaItem?.id || null,
        idEn: locationEnItem?.id || null,
        valueUa: locationUaItem?.value || '',
        valueEn: locationEnItem?.value || '',
    } : null;

    const filteredContacts = contact.filter(item => item.category !== 'LocationUa' && item.category !== 'LocationEn');

    const orderedContacts = [...filteredContacts];
    if (locationItem) {
        orderedContacts.splice(3, 0, locationItem);
    }

    return (
        <div className={styles.container}>
            {isLoading ? <Spinner /> : (
                <>
                    {orderedContacts.map((contactItem) => {
                        let displayCategory = categoryLabels[contactItem.category] || contactItem.category;
                        let displayedValue = contactItem.value;

                        if (contactItem.category === 'PhoneNumber') {
                            displayCategory = categoryLabels.PhoneNumber[contactItem.id - 1];
                        }
                        if (contactItem.category === 'Statistics') {
                            displayCategory = categoryLabels.Statistics[contactItem.id - 9];
                        }
                        if (contactItem.category === 'Location') {
                            displayedValue = `${contactItem.valueUa} | ${contactItem.valueEn}`;
                        }
                        return (
                            <ContactItem
                                key={contactItem.id}
                                contactLineStyle={styles.contactLine}
                                categoryStyle={styles.category}
                                contactCategory={displayCategory}
                                contactValue={displayedValue}
                                valueStyle={styles.value}
                                iconsContainerStyle={styles.iconsContainer}
                                contactIconStyle={styles.contactIcon}
                                contactIcon={categoryIcons[contactItem.category] || null}
                                contactIconContainerStyle={styles.contactIconContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={() => {
                                        if (contactItem.category === 'Location') {
                                            showModal('generic',
                                                <ContactForm
                                                    type='edit'
                                                    contactData={{
                                                        category: "Location",
                                                        idUa: contactItem.idUa,
                                                        idEn: contactItem.idEn,
                                                    }}
                                                    categoryLabel={categoryLabels['Location']}
                                                />);
                                        } else {
                                            showModal(
                                                'generic',
                                                <ContactForm
                                                    type='edit'
                                                    contactData={contactItem}
                                                    categoryLabel={displayCategory}
                                                />);
                                        }
                                    }}
                                />
                                <TrashIcon
                                    className={`${styles.trash_icon} ${styles.icon_disabled}`}
                                />
                            </ContactItem>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default memo(ContactList);