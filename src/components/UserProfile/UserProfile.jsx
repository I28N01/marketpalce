import styles from "./UserProfile.module.scss";
import Button from '../UI/Button/Button';



function UserProfile() {
    return (

        <div>

            <h2 className={styles.main__h2}>Здравствуйте, Антон!</h2>

            <div className={styles.main__profile}>
                <div className={styles.profile__content}>
                    <h3 className={styles.profile__title}>Настройки профиля</h3>
                    <div className={styles.profile__settings}>
                        <div className={styles.settings__left}>
                            <div className={styles.settings__img}>
                                <a href="" target="_self">
                                    <img src="#" alt="" />
                                </a>

                            </div>
                            <a className={styles.settings__change_photo} href="" target="_self">
                                Заменить
                            </a>
                        </div>
                        <div className={styles.settings__right}>
                            <form className={styles.settings__form} action="#">
                                <div className={styles.settings__div}>
                                    <label htmlFor="fname">Имя</label>
                                    <input className={styles.settings__f_name} id="settings-fname" name="fname" type="text" value="Антон" placeholder="" />
                                </div>

                                <div className={styles.settings__div}>
                                    <label htmlFor="lname">Фамилия</label>
                                    <input className={styles.settings__l_name} id="settings-lname" name="lname" type="text" value="Городецкий" placeholder="" />
                                </div>

                                <div className={styles.settings__div}>
                                    <label htmlFor="city">Город</label>
                                    <input className={styles.settings__city} id="settings-city" name="city" type="text" value="Санкт-Петербург" placeholder="" />
                                </div>

                                <div className={styles.settings__div}>
                                    < label htmlFor="phone" > Телефон</label >
                                    <input className={styles.settings__phone} id="settings - phone" name="phone" type="tel" value="89161234567" placeholder=" + 79161234567" />
                                </div >

                                <Button text="Сохранить" view="primary" />
                            </form >
                        </div >
                    </div >
                </div >
            </div >

        </div >
    )
}

export default UserProfile;