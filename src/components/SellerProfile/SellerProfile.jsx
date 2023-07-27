import styles from "./SellerProfile.module.scss";
import DateFormatter from "../UI/DateFormatter/DateFormatter";
import React, { useEffect, useState } from 'react';
import PhoneNumber from "../UI/PhoneNumber/PhoneNumber";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Items from '../Items/Items';

function SellerProfile() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();
    console.log(id);

    const [adData, setAdData] = useState(null);
    const [error, setError] = useState(null);
    const [adsData, setAdsData] = useState([]);
    const photoURL = 'http://127.0.0.1:8090/';

    useEffect(() => {
        fetchAdData();
    }, []);

    useEffect(() => {
        if (adData) {
            fetchDataForSellerItems();
        }
    }, [adData]);

    const fetchAdData = () => {
        axios.get(`http://127.0.0.1:8090/ads/${id}`)
            .then((response) => {
                setAdData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const fetchDataForSellerItems = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8090/ads?user_id=${adData.user.id}`);
            setAdsData(response.data);
        } catch (error) {
            console.error('Ошибка при выполнении GET-запроса:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!adData) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.main__h2}>Профиль продавца</h2>

            <div className={styles.main__profile_sell}>
                <div className={styles.profile_sell__content}>
                    <div className={styles.profile_sell__seller}>
                        <div className={styles.seller__left}>
                            <div className={styles.seller__img}>
                                <img src={`${photoURL}${adData.user.avatar}`} alt="user" />
                            </div>
                        </div>
                        <div className={styles.seller__right}>
                            <h3 className={styles.seller__title}>{adData.user.name}</h3>
                            <p className={styles.seller__city}>{adData.user.city}</p>
                            <p className={styles.seller__inf}>Продает товары с <DateFormatter dateStr={adData.created_on} /></p>
                            <div className={styles.seller__img_mob_block}>
                                <div className={styles.seller__img_mob}>
                                    <a href="" target="_self">
                                        <img src="#" alt="" />
                                    </a>
                                </div>
                            </div>
                            {adData.user.phone && adData.user.phone.length >= 6 ? (
                                <PhoneNumber phoneNumber={adData.user.phone} />
                            ) : (
                                <p className={styles.invalid_phone}>Номер не указан</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h3 className={styles.main__h2}>
                Товары продавца
            </h3>
            <Items data={adsData} searchTerm={''} />
        </div>
    );
}

export default SellerProfile;
