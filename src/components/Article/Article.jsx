import styles from "./Article.module.scss";
import React, { useEffect, useState } from 'react';
import TimeFormatter from "../TimeFormatter/TimeFormatter";
import DateFormatter from "../DateFormatter/DateFormatter";
import { getAdData } from '../Redux/Actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Article() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();
    const dispatch = useDispatch();
    const { adData, error } = useSelector((state) => state.ad);

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
                            <img src="" alt="" />
                        </div>
                        <div className={styles.article__img_bar}>
                            <div className={styles.article__img_bar_div}>
                                <img src="" alt="" />
                            </div>
                            <div className={styles.article__img_bar_div}>
                                <img src="" alt="" />
                            </div>
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
                        <button className={styles.article__btn} >Показать&nbsp;телефон
                            <span>{adData.user.phone}</span>
                        </button>
                        <div className={styles.article__author}>
                            <div className={styles.author__img}>
                                <img src={`http://127.0.0.1:8090/${adData.user.avatar}`} alt="avatar" />
                            </div>
                            <div className={styles.author__cont}>
                                <p className={styles.author__name}>{adData.user.name}</p>
                                <p className={styles.author__about}>Продает товары с <DateFormatter dateStr={adData.created_on} /></p>
                            </div>
                        </div>
                    </div>

                </div>



            </div >
        </div >
    )
}

export default Article;