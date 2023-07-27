import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimeFormatter from '../../components/UI/TimeFormatter/TimeFormatter';
import styles from "./Reviews.module.scss";

function Reviews({ adId, onClose, isLoggedIn }) {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8090/ads/${adId}/comments`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            setReviews(response.data);
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText) return;

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(`http://127.0.0.1:8090/ads/${adId}/comments`, {
                text: reviewText
            }, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            // Обновляем отзывы после успешной отправки
            setReviews((prevReviews) => [response.data, ...prevReviews]);
            setReviewText('');
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }
    };
    const isUserLoggedIn = !!localStorage.getItem('access_token'); // Проверка авторизации пользователя
    return (
        <div className={styles.wrapper}>
            <div className={styles.modal__btn_close} onClick={onClose}>
                <div className={styles.modal__btn_close_line}></div>
            </div>
            <div>
                <div className={styles.modal__block}>
                    <div className={styles.modal__content}>
                        <h3 className={styles.modal__title}>Отзывы о товаре</h3>

                        <div className={styles.modal__scroll}>
                            {isUserLoggedIn && (
                                <form className={styles.modal__form_newArt} id="formNewArt" onSubmit={handleReviewSubmit}>
                                    <div className={styles.form_newArt__block}>
                                        <label htmlFor="text">Добавить отзыв</label>
                                        <textarea className={styles.form_newArt__area} name="text" id="formArea" cols="auto" rows="5" 
                                        placeholder="Введите описание" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                                    </div>
                                    <button className={styles.form_newArt__btn_pub}>Опубликовать</button>
                                </form>
                            )}

                            <div className={styles.modal__reviews}>
                                {reviews.map((review) => (
                                    <div key={review.id} className={styles.reviews__review}>
                                        <div className={styles.review__item}>
                                            <div className={styles.review__left}>
                                                <div className={styles.review__img}>
                                                    <img src={`http://127.0.0.1:8090/${review.author.avatar}`} alt="user" />
                                                </div>
                                            </div>
                                            <div className={styles.review__right}>
                                                <p className={`${styles.review__name} ${styles.font_t}`}>{review.author.name} <span><TimeFormatter time={review.created_on} /></span></p>
                                                <h5 className={`${styles.review__title} ${styles.font_t}`}>Комментарий</h5>
                                                <p className={`${styles.review__text} ${styles.font_t}`}>{review.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div>
    )
}

export default Reviews;
