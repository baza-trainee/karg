import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/searchBar.module.scss";

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <input
                type='text'
                placeholder='Пошук'
                className={styles.search}
            />
            <SearchIcon className={styles.icon} />
        </div>
    );
};

export default SearchBar;