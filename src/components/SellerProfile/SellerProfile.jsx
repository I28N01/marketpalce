import styles from "./SellerProfile.module.scss";
import TimeFormatter from "../TimeFormatter/TimeFormatter";
import DateFormatter from "../DateFormatter/DateFormatter";
import { getAdData } from '../Redux/Actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function SellerProfile() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();
    const dispatch = useDispatch();
    const { adData, error } = useSelector((state) => state.ad);
    const photoURL = 'http://127.0.0.1:8090/';

    useEffect(() => {
        dispatch(getAdData(id));
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!adData) {
        return;
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

                            <button className={styles.seller__btn}>Показать&nbsp;телефон
                                <span>{adData.user.phone}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className={styles.main__h2}>
                Товары продавца
            </h3>

        </div >
    )
};

export default SellerProfile;