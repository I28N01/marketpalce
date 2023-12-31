import styles from "./Main.module.scss";
import Header from "../../components/Header/Header"
import Search from "../../components/Search/Search";
import Items from "../../components/Items/Items";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer/Footer";

function Main() {
    const [searchTerm, setSearchTerm] = useState('');
    const [adsData, setAdsData] = useState([]);


//делаем запрос для получения списка всех объявлений
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8090/ads');
                setAdsData(response.data);
            } catch (error) {
                console.error('Ошибка при выполнении GET-запроса:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                    <div className={styles.main__container}>
                        <h2 className={styles.main__h2}>Объявления</h2>
                        <div className={styles.main__content}>
                            <Items data={adsData} searchTerm={searchTerm} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Main;