import styles from "./Article.module.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimeFormatter from "../TimeFormatter/TimeFormatter";
import DateFormatter from "../DateFormatter/DateFormatter";


function Article() {
    const [ad, setAd] = useState([]);
    let id = '2';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8090/ads/${id}`);
                setAd(response.data);
            } catch (error) {
                console.error('Ошибка при выполнении GET-запроса:', error);
            }
        };

        fetchData();
    }, []);

    // Добавляем проверку на наличие данных в объекте ad перед их использованием
    if (!ad || !ad.user) {
        return <div>...</div>;
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
                        <h3 className={styles.article__title}>{ad.title}</h3>
                        <div className={styles.article__info}>
                            <p className={styles.article__date}><TimeFormatter time={ad.created_on} /></p>
                            <p className={styles.article__city}>{ad.user.city}</p>
                            <a className={styles.article__link} href="" target="_blank" rel="">23 отзыва</a>
                        </div>
                        <p className={styles.article__price}>{ad.price}</p>
                        <button className={styles.article__btn} >Показать&nbsp;телефон
                            <span>{ad.user.phone}</span>
                        </button>
                        <div className={styles.article__author}>
                            <div className={styles.author__img}>
                                <img src={`http://127.0.0.1:8090/${ad.user.avatar}`} alt="avatar" />
                            </div>
                            <div className={styles.author__cont}>
                                <p className={styles.author__name}>{ad.user.name}</p>
                                <p className={styles.author__about}>Продает товары с <DateFormatter dateStr={ad.created_on} /></p>
                            </div>
                        </div>
                    </div>

                </div>



            </div >
        </div >
    )
}

export default Article;