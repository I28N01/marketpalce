import styles from "./Menu.module.scss";
import Button from '../../../components/UI/Button/Button';
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <div className={styles.main__menu}>
            <a className={styles.menu__logo_link} href="" target="_blank">
                <img className={styles.menu__logo_img} src="assets/img/logo.png" alt="logo" />
            </a>
            <form className={styles.menu__form} action="#">
                <Link to="/"><Button text="Вернуться на главную" view="primary" /></Link>
            </form>
        </div>
    )
}

export default Menu;