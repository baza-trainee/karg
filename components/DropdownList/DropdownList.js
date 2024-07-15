'use client';

import Link from "next/link";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import styles from '../Header/styles/header.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import { ArrowDown } from "@/public/assets/icons";

const DropdownList = ({ label, list, openBurgerMenu, subst }) => {
    const [isOpen, setOpen] = useState(false);
    const currentPathname = usePathname();

    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    const wrapRef = useRef(null);
    const handleClickOutsideMenu = (event) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        }
    }, []);

    return (
        <div>
            {!openBurgerMenu &&
                <div className={`${styles.dropHover} ${isOpen ? styles.active : ''}`} onClick={() => handleMenuToggle()} ref={wrapRef}>
                    <p className={`${styles.navMenuDropList} ${styles.ArrowDown} ${(currentPathname.includes(subst)) ? styles.active : ""}`}>
                        <span>{label}</span>
                        <ArrowDown />
                    </p>
                    <ul
                        className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
                    >
                        {list.map((item) => {
                            return (
                                <li key={item.label}>
                                    <Link href={item.link} className={`${styles.navMenuDropList} ${(currentPathname === item.link) ? styles.active : ""}`}>{item.label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
            {openBurgerMenu &&
                <div>
                    <p className={styles.navMenuInnerMenu} onClick={() => handleMenuToggle()}>
                        <span>{label}</span>
                        <ArrowDown />
                    </p>
                    {isOpen ? (
                        <ul className={styles.navMenuInnerList}>
                            {list.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <Link href={item.link}>{item.label}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : null}
                </div>
            }
        </div>
    );
};

DropdownList.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    openBurgerMenu: PropTypes.bool,
    subst: PropTypes.string
}
export default DropdownList;
