import styles from "./Header.module.scss";
import Button from "../UI/Button";

function Main() {
    return (
        <div className={styles.header}>
            <nav className={styles.nav}>
                <Button text="Вход в личный кабинет" />
            </nav>
        </div>
    )
}

export default Main;