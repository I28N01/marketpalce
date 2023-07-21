import styles from "./Main.module.scss";
import Header from "../../components/Header/Header"
import Search from "../../components/Search/Search";
import Items from "../../components/Items/Items";

function Main() {
    return (
        <div className="wrapper">
            <div className="container">
                <Header />
                <main class="main">
                    <Search />
                    <div className={styles.main__container}>
                        <h2 className={styles.main__h2}>Объявления</h2>
                        <div className={styles.main__content}>
                            <div className={styles.content__cards}>
                                <Items />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main;