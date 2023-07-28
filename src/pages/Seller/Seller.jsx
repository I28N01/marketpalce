import styles from "./Seller.module.scss";
import Header from "../../components/Header/Header"
import Menu from "../../components/UI/Menu/Menu";
import SellerProfile from "../../components/SellerProfile/SellerProfile";
import Footer from "../../components/Footer/Footer";


function Seller() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <Menu />
                        <SellerProfile />

                    </div >
                </main >
            </div >
            <Footer />
        </div >
    )
}

export default Seller;