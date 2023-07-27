
import styles from "./Footer.module.scss";
import ArticleCreator from "../ArticleCreator/ArticleCreator";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer() {
    const isUserLoggedIn = !!localStorage.getItem('access_token');
    const [showModal, setShowModal] = useState(false);

    function GuestMenu() {
        return (
            <footer className={styles.footer}>
                <div className={styles.footer__container}>
                    <div className={styles.footer__img}>
                        <Link to="/">
                            <img src="./assets/img/icon_01.png" alt="home" />
                        </Link>
                    </div>
                    <div className={styles.footer__img}>
                        <Link to="/profile">
                            <img src="./assets/img/icon_03.png" alt="home" />
                        </Link>
                    </div>
                </div>
            </footer>
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


            <footer className={styles.footer}>
                <div className={styles.footer__container}>
                    <div className={styles.footer__img}>
                        <Link to="/">
                            <img src="../assets/img/icon_01.png" alt="home" />
                        </Link>
                    </div>
                    <div className={styles.footer__img}>
                        <div onClick={handleOpenModal}>
                            <img src="../assets/img/icon_02.png" alt="home" />
                        </div>
                    </div>
                    <div className={styles.footer__img}>
                        <Link to="/profile">
                            <img src="../assets/img/icon_03.png" alt="home" />
                        </Link>
                    </div>
                </div>

                {
                    showModal && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <ArticleCreator onClose={handleCloseModal} />
                            </div>
                        </div>
                    )
                }
            </footer>

        );
    }

    return (
        <div className={styles.header}>
            {isUserLoggedIn ? <AuthenticatedMenu /> : <GuestMenu />}
        </div>
    )
}

export default Footer;


