
import styles from './Search.module.scss'


const Search = ({ searchTerm, onSearchChange }) => {

    const handleChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (

        <div className={styles.search}>
            <a className={styles.search__logo_link} target="_blank">
                <img className={styles.search__logo_img} src="assets/img/logo.png" alt="logo" />
            </a>
            <a className={styles.search__logo_mob_link} href="#" target="_blank">
                <img className={styles.search__logo_mob_img} src="assets/img/logo-mob.png" alt="logo" />
            </a>
            <form className={styles.search__form} action="#">
                <input className={styles.search__text} type="search" placeholder="Поиск по объявлениям" name="search" value={searchTerm}
                    onChange={handleChange} />
                <input className={styles.search__text_mob} type="search" placeholder="Поиск" name="search-mob" value={searchTerm}
                    onChange={handleChange} />
                <button className={styles.search__btn}>Найти</button>
            </form>

        </div>

    );
};

export default Search;
