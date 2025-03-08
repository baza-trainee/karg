'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ContactLinksContext = createContext({
    phone1: '+38 (093) 986-2262',
    phone2: '+38 (098) 844-7937',
    email: 'karg.inform@gmail.com',
    address: 'м. Київ',
    instagram: 'https://www.instagram.com/karg.kyiv?igsh=MWp0cDE1dDB4bHRoeQ==',
    facebook: 'https://www.facebook.com/KARG.kyivanimalrescuegroup',
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
        "https://www.karg.kyiv.ua/"
    )}&text=${encodeURIComponent(
        "Поділись порталом КАРГ з іншими"
    )}`,
    statistic: ['2427', '2500', '720', '115+'],
    loading: true
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ContactLinksProvider = ({ children }) => {

    const [contactData, setContactData] = useState({
        phone1: '+38 (093) 986-2262',
        phone2: '+38 (098) 844-7937',
        email: 'karg.inform@gmail.com',
        address: 'м. Київ',
        instagram: 'https://www.instagram.com/karg.kyiv?igsh=MWp0cDE1dDB4bHRoeQ==',
        facebook: 'https://www.facebook.com/KARG.kyivanimalrescuegroup',
        telegram: `https://t.me/share/url?url=${encodeURIComponent(
            "https://www.karg.kyiv.ua/"
        )}&text=${encodeURIComponent(
            "Поділись порталом КАРГ з іншими"
        )}`,
        statistic: ['2427', '2500', '720', '115+'],
        loading: true
    });

    useEffect(() => {

        const fetchContactData = async () => {

            try {
                const response = await fetch(`${API_BASE_URL}api/contact/getall`);
                if (response.ok) {
                    const data = await response.json();

                    const findById = (id) => {
                        const item = data.find(el => el.id === id);
                        return item ? item.value : null;
                    };
                    setContactData({
                        phone1: findById(1),
                        phone2: findById(2),
                        email: findById(3),
                        address: [findById(4), findById(5)],
                        instagram: findById(6),
                        facebook: findById(7),
                        telegram: findById(8),
                        statistic: [findById(9), findById(10), findById(11), findById(12)],
                        loading: false
                    });
                }
            } catch (error) {
                console.error("Error fetching contact data:", error);
                setContactData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchContactData();
    }, [API_BASE_URL]);

    return (
        <ContactLinksContext.Provider value={contactData}>
            {children}
        </ContactLinksContext.Provider>
    );
};

export const useContactLinks = () => useContext(ContactLinksContext);