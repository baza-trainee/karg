import styles from "./styles/categorySelector.module.scss";
import variables from "../../../../variables.module.scss";
import { ShevronDown } from '@/public/assets/icons';
import { useState } from "react";

function CategorySelector({ categories, selectedCategory, onSelectedCategory }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectCategory = (category) => {
        onSelectedCategory(category);
        // setIsOpen(false);
    };

    return (
        <div className={styles.selectorBlock}>
            <div className={styles.selectedCategoryBlock}>
                <p className={`${styles.defaultCategory} ${variables.font20w500}`} onClick={toggleDropdown}>
                    Найновіші
                </p>
                <div className={styles.iconContainer}>
                    <ShevronDown className={styles.icon} />
                </div>
                {isOpen && (
                    <div className={styles.dropdownContent}>
                        {categories.map((category) => (
                            <p key={category} className={`${styles.category} ${variables.font18w500} ${category === selectedCategory ? styles.activeCategory : ''}`} onClick={() => handleSelectCategory(category)}>
                                {category}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default CategorySelector;