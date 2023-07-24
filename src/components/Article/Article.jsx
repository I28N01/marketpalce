import styles from "./Article.module.scss";
import React, { useEffect, useState } from 'react';
import TimeFormatter from "../UI/TimeFormatter/TimeFormatter";
import DateFormatter from "../UI/DateFormatter/DateFormatter";
import PhoneNumber from "../UI/PhoneNumber/PhoneNumber";
import { getAdData } from '../Redux/Actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Article() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();


    /** Redux */
    const dispatch = useDispatch();
    const { adData, error } = useSelector((state) => state.ad);

    const photoURL = 'http://127.0.0.1:8090/';

    useEffect(() => {
        dispatch(getAdData(id));
    }, [dispatch]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    // Добавьте проверку на наличие данных перед их использованием
    if (!adData) {
        return;
    }




    return (
        <div className={styles.main__artic}>
            <div className={styles.artic__content}>
                <div className={styles.article__left}>
                    <div className={styles.article__fill_img}>
                        <div className={styles.article__img}>
                            <img src={adData.images && adData.images.length > 0 ? `${photoURL}${adData.images[0].url}` : '../assets/img/no-image.jpg'} alt="Изображение объявления" />
                        </div>
                        <div className={styles.article__img_bar}>
                            {adData.images?.map((i) => (
                                <div className={styles.article__img_bar_div}>
                                    <a href={`${photoURL}${i.url}`} target="_blank">
                                        <img src={`${photoURL}${i.url}`} alt="picture" />
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className={styles.article__img_bar_mob}>
                            <div className={styles.img_bar_mob__circle}></div>
                            <div className={styles.img_bar_mob__circle}></div>
                        </div>
                    </div>
                </div>


                <div className={styles.article__right}>

                    <div className={styles.article__block}>
                        <h3 className={styles.article__title}>{adData.title}</h3>
                        <div className={styles.article__info}>
                            <p className={styles.article__date}><TimeFormatter time={adData.created_on} /></p>
                            <p className={styles.article__city}>{adData.user.city}</p>
                            <a className={styles.article__link} href="" target="_blank" rel="">23 отзыва</a>
                        </div>
                        <p className={styles.article__price}>{adData.price}</p>
                        <PhoneNumber phoneNumber={adData.user.phone} />
                        <div className={styles.article__author}>
                            <div className={styles.author__img}>
                                <img src={`${photoURL}${adData.user.avatar}`} alt="avatar" />
                            </div>
                            <div className={styles.author__cont}>
                                <a href={`/seller/${adData.user_id}`}>
                                    <p className={styles.author__name}>{adData.user.name}</p>
                                    <p className={styles.author__about}>Продает товары с <DateFormatter dateStr={adData.created_on} /></p>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>



            </div >
        </div >
    )
}

export default Article;