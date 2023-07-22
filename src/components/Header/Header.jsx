import styles from "./Header.module.scss";
import Button from "../UI/Button/Button";
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/login"><Button text="Вход в личный кабинет" view="secondary" /></Link>
            </nav>
            {/* <nav>
                <Link to="/login"><Button text="Разместить объявление" view="secondary" /></Link>
                <Link to="/profile"><Button text="Личный кабинет" view="secondary" /></Link>
            </nav> */}
        </div>
    )
}

export default Main;

