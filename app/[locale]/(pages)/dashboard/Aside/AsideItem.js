'use client';

import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ShevronDown } from '@/public/assets/icons/aside';
import { AdminContext } from '@/app/adminProvider';
import styles from "./styles/aside.module.scss";

const AsideItem = ({
    titleStyle,
    title,
    handleItemClick,
    itemStyle,
    wrapperStyle,
    children,
    isNestedItems,
    nestedData
}) => {
    const { activeSection } = useContext(AdminContext);
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        if (isNestedItems) {
            setCollapsed(!collapsed);
        }
    };

    return (
        <div className={wrapperStyle}>
            <div className={itemStyle} onClick={toggleCollapse}>
                {children}
                <p className={titleStyle}>
                    {title}
                </p>
                {isNestedItems && (
                    <ShevronDown
                        className={styles.icon_shevronDown}
                        onClick={toggleCollapse}
                    />
                )}
            </div>
            {isNestedItems && collapsed && (
                <ul className={styles.nestedStyle}>
                    {nestedData.map((d, index) => {
                        return (
                            <li key={index}
                                onClick={() => handleItemClick(d.title)}
                                className={d.title === activeSection ? styles.activeNestedStyle : ''}
                            >
                                <p>{d.title}</p>
                            </li>
                        )
                    })}
                </ul>
            )}
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