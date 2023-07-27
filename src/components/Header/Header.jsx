import styles from "./Header.module.scss";
import Button from "../UI/Button/Button";
import ArticleCreator from "../ArticleCreator/ArticleCreator";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Main() {
    const isUserLoggedIn = !!localStorage.getItem('access_token');
    const [showModal, setShowModal] = useState(false);

    function GuestMenu() {
        return (
            <nav className={styles.nav}>
                <Link to="/login"><Button text="Вход в личный кабинет" view="secondary" /></Link>
            </nav>
        );
    }

    function AuthenticatedMenu() {
        const handleOpenModal = () => {
            setShowModal(true);
        };

        const handleCloseModal = () => {
            setShowModal(false);
        };

        return (
            <nav className={styles.nav}>
                <div onClick={handleOpenModal}><Button text="Разместить объявление" view="secondary" /></div>
                <Link to="/profile"><Button text="Личный кабинет" view="secondary" /></Link>
                {
                    showModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <ArticleCreator onClose={handleCloseModal} />
                            </div>
                        </div>
                    )
                }
            </nav >
        );
    }

    return (
        <div className={styles.header}>
            {isUserLoggedIn ? <AuthenticatedMenu /> : <GuestMenu />}
        </div>
    )
}

export default Main;


