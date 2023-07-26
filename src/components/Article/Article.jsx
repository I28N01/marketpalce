import styles from "./Article.module.scss";
import React, { useEffect, useState } from 'react';
import TimeFormatter from "../UI/TimeFormatter/TimeFormatter";
import DateFormatter from "../UI/DateFormatter/DateFormatter";
import PhoneNumber from "../UI/PhoneNumber/PhoneNumber";
import ReviewCount from "../UI/ReviewCount/ReviewCount";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Reviews from "../../pages/Reviews/Reviews";

function Article() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();

    const [adData, setAdData] = useState(null);
    const [error, setError] = useState(null);
    const [showReviews, setShowReviews] = useState(false); // Добавляем состояние для отображения окна с отзывами
    const [mainImage, setMainImage] = useState('');

    const URL = 'http://127.0.0.1:8090/';

    useEffect(() => {
        fetchAdData();
    }, []);

    const fetchAdData = () => {
        axios.get(`http://127.0.0.1:8090/ads/${id}`)
            .then((response) => {
                setAdData(response.data);
                // Устанавливаем первое изображение как основное изображение при загрузке данных
                if (response.data.images && response.data.images.length > 0) {
                    setMainImage(`${URL}${response.data.images[0].url}`);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleShowImage = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const handleShowReviews = () => {
        setShowReviews(true); // Показываем окно с отзывами
    };

    const handleCloseReviews = () => {
        setShowReviews(false); // Скрываем окно с отзывами
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Добавьте проверку на наличие данных перед их использованием
    if (!adData) {
        return null;
    }

    return (
        <div className={styles.main__artic}>
            <div className={styles.artic__content}>
                <div className={styles.article__left}>
                    <div className={styles.article__fill_img}>
                        <div className={styles.article__img}>
                            <img src={mainImage || '../assets/img/no-image.jpg'} alt="Изображение объявления" />
                        </div>
                        <div className={styles.article__img_bar}>
                            {adData.images?.map((i) => (
                                <div className={styles.article__img_bar_div} key={i.id}>
                                    
                                        <img src={`${URL}${i.url}`} alt="picture" onClick={() => handleShowImage(`${URL}${i.url}`)} />
                                   
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
                            {/* Добавляем ссылку и обработчик клика для открытия окна с отзывами */}
                            <a className={styles.article__link} onClick={handleShowReviews}><ReviewCount adId={id} /> отзыва</a>
                        </div>
                        <p className={styles.article__price}>{adData.price}</p>
                        <PhoneNumber phoneNumber={adData.user.phone} />
                        <div className={styles.article__author}>
                            <div className={styles.author__img}>
                                <img src={`${URL}${adData.user.avatar}`} alt="avatar" />
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
            </div>

            {/* Показываем окно с отзывами, если showReviews равно true */}
            {showReviews && (
                <div className={styles.modal__overlay}>
                    <div className={styles.wrapper}>
                        <div className={styles.container_bg}>
                            <div className={styles.modal__block}>
                                <div className={styles.modal__content}>
                                    {/* Передаем id объявления в компонент Reviews */}
                                    <Reviews adId={id} onClose={handleCloseReviews} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Article;
