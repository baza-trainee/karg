'use client';

import Link from "next/link";
import PropTypes from "prop-types";
import { useRef, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import styles from '../Header/styles/header.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import { ArrowDown } from "@/public/assets/icons";
import { useDropdown } from './DropdownContext';

const DropdownList = ({ label, list, openBurgerMenu, subst }) => {
    const { openDropdown, setOpenDropdown } = useDropdown();
    const currentPathname = usePathname();
    const wrapRef = useRef(null);
    const router = useRouter();

    const handleMenuToggle = () => {
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(label);
        }
    };

    const handleClickOutsideMenu = (event) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
            if (event.target.href) router.push(event.target.href);
            setOpenDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);

    return (
        <div>
            {!openBurgerMenu &&
                <div className={`${styles.dropHover} ${openDropdown === label ? styles.active : ''}`} onClick={() => handleMenuToggle()} ref={wrapRef}>
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
                            );
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
                    {openDropdown === label ? (
                        <ul className={styles.navMenuInnerList}>
                            {list.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <Link href={item.link}>{item.label}</Link>
                                    </li>
                                );
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
};
export default DropdownList;