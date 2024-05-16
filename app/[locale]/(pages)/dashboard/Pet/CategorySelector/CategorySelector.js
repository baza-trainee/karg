import styles from "./styles/categorySelector.module.scss";
import variables from "../../../../variables.module.scss";
import { ShevronDown } from '@/public/assets/icons';
import { useRef, useState, useEffect } from "react";

function CategorySelector({ categories, selectedCategory, onSelectedCategory }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const dropDownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSelectCategory = (category) => {
        if (category.value === null) {
            onSelectedCategory(null);
        } else {
            onSelectedCategory(category);
        }
    };

    return (
        <div className={styles.selectorBlock}>
            <div ref={dropDownRef} className={styles.selectedCategoryBlock}>
                <p key="all"
                    className={`${styles.defaultCategory} ${variables.font20w500}`}
                    onClick={() => handleSelectCategory({ label: 'Найновіші', value: null })}>
                    Найновіші
                </p>
                <div className={styles.iconContainer}>
                    <ShevronDown className={styles.icon} onClick={toggleDropdown} />
                </div>
                {isOpen && (
                    <div className={styles.dropdownContent}>
                        {categories.map((category) => (
                            <p key={category.value}
                                className={`${styles.category} ${variables.font18w500} ${category.value === selectedCategory ? styles.activeCategory : ''}`}
                                onClick={() => handleSelectCategory(category)}>
                                {category.label}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default CategorySelector;