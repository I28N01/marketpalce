import React, { useEffect, useState } from 'react';
import styles from './Article.module.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Reviews from '../../pages/Reviews/Reviews';
import ArticleImageGallery from '../ArticleImageGallery/ArticleImageGallery';
import ArticleInfo from '../ArticleInfo/ArticleInfo';


function Article() {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    const id = currentPath.pop() || currentPath.pop();

    const [adData, setAdData] = useState(null);
    const [error, setError] = useState(null);
    const [showReviews, setShowReviews] = useState(false); // Добавляем состояние для отображения окна с отзывами


    useEffect(() => {
        fetchAdData();
    }, []);

    const fetchAdData = () => { //запрос на получение данных объявления
        axios.get(`http://127.0.0.1:8090/ads/${id}`)
            .then((response) => {
                setAdData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
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

    // Проверка на наличие данных перед их использованием
    if (!adData) {
        return null;
    }

    return (
        <div className={styles.main__artic}>
            <div className={styles.artic__content}>
                <ArticleImageGallery images={adData.images} baseUrl="http://127.0.0.1:8090/" />
                <ArticleInfo
                    adData={adData}
                    baseUrl="http://127.0.0.1:8090/"
                    id={id}
                    handleShowReviews={handleShowReviews} />
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

            <div className={styles.main__container}>
                <h3 className={`${styles.main__title} ${styles.title}`}>
                    Описание товара
                </h3>
                <div className={styles.main__content}>
                    <p className={styles.main__text}>{adData.description}</p>

                </div>

            </div>
        </div>
    );
}

export default Article;
