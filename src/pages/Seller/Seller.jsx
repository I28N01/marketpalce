import styles from "./Seller.module.scss";
import Header from "../../components/Header/Header"
import Menu from "../../components/UI/Menu/Menu";
import SellerProfile from "../../components/SellerProfile/SellerProfile";
import Items from "../../components/Items/Items";
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react';


function Seller() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();

    const [adsData, setAdsData] = useState([]);
    useEffect(() => {
        // Функция для выполнения GET-запроса
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8090/ads?user_id=${id}`);
                setAdsData(response.data);
            } catch (error) {
                console.error('Ошибка при выполнении GET-запроса:', error);
            }
        };

        // Выполняем GET-запрос при монтировании компонента
        fetchData();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.main__container}>
                        <Menu />
                        <SellerProfile />
                        <Items data={adsData} searchTerm={''} />
                    </div >
                </main >
            </div >
        </div >
    )
}

export default Seller;