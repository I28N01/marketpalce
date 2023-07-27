import styles from "./Profile.module.scss";
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import UserProfile from "../../components/UserProfile/UserProfile";
import Items from "../../components/Items/Items";
import Menu from "../../components/UI/Menu/Menu";
import axios from 'axios';
import Footer from "../../components/Footer/Footer";

function Profile() {
    const [adsData, setAdsData] = useState([]);


    useEffect(() => {
        fetchAdsData();
    }, []);

    const fetchAdsData = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get('http://127.0.0.1:8090/ads/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            setAdsData(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка товаров:', error);
        }
    };
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
                                    <Items data={adsData} />
                                </div>
                            </div>
                        </div >
                    </div >
                </main >
            </div >
            <Footer />
        </div >
    )
}

export default Profile;