import styles from "./Profile.module.scss";
import Header from "../../components/Header/Header"
import UserProfile from "../../components/UserProfile/UserProfile";
import Items from "../../components/Items/Items";
import Menu from "../../components/UI/Menu/Menu";

function Profile() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />

                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <Menu />
                        <UserProfile />
                        <h3 className={styles.main__title}>
                            Мои товары
                        </h3>
                        <div className={styles.main__content}>
                            <div className={styles.content__cards}>
                                <div className={styles.cards__item}>
                                    {/* <Items data={adsData} searchTerm={searchTerm} /> */}
                                </div>
                            </div>
                        </div >
                    </div >
                </main >
            </div >
        </div >
    )
}

export default Profile;