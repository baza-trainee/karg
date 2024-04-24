'use client';

import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { ShevronDown } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";

const AsideItem = ({
    titleStyle,
    title,
    href,
    itemStyle,
    wrapperStyle,
    children,
    isNestedItems,
    nestedData
}) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={wrapperStyle}>
            <div className={itemStyle}>
                {children}
                <p className={titleStyle}>
                    <Link href='#'>{title}</Link>
                </p>
                {isNestedItems && <ShevronDown className={styles.icon_shevronDown} onClick={() => { setCollapsed(!collapsed) }} />}
            </div>
            {isNestedItems && collapsed &&
                <ul className={styles.nestedStyle}>
                    {nestedData.map((d, index) => {
                        return (
                            <li key={index}><Link href={d.href}>{d.title}</Link></li>
                        )
                    })}
                </ul>
            }
        </div>
    );
};

AsideItem.propTypes = {
    itemStyle: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.string,
    wrapperStyle: PropTypes.string,
}
export default AsideItem;