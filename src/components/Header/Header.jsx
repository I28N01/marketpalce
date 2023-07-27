import styles from "./Header.module.scss";
import Button from "../UI/Button/Button";
import { Link } from 'react-router-dom';

function Main() {

    const isUserLoggedIn = !!localStorage.getItem('access_token');
    function GuestMenu() {
        return (
            <nav className={styles.nav}>
                <Link to="/login"><Button text="Вход в личный кабинет" view="secondary" /></Link>
            </nav>
        );
    }

    function AuthenticatedMenu() {
        return (
            <nav className={styles.nav}>
                <Link to="/ArticleCreator"><Button text="Разместить объявление" view="secondary" /></Link>
                <Link to="/profile"><Button text="Личный кабинет" view="secondary" /></Link>
            </nav>
        );
    }
    return (
        <div className={styles.header}>
            {isUserLoggedIn ? <AuthenticatedMenu /> : <GuestMenu />}

        </div>
    )
}

export default Main;





