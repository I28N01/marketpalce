import styles from "./Advert.module.scss";
import Header from "../../components/Header/Header"
import Menu from "../../components/UI/Menu/Menu";
import Article from "../../components/Article/Article";

function Advert() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <Menu />
                        <Article />
                    </div >
                </main >
            </div >
        </div >
    )
}

export default Advert;