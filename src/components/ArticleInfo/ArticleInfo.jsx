import React, { useState } from 'react';
import styles from '../Article/Article.module.scss';
import TimeFormatter from '../UI/TimeFormatter/TimeFormatter';
import PhoneNumber from '../UI/PhoneNumber/PhoneNumber';
import ReviewCount from '../UI/ReviewCount/ReviewCount';
import DateFormatter from '../UI/DateFormatter/DateFormatter';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../UI/Button/Button";
import ArticleEditor from "../ArticleEditor/ArticleEditor";


function ArticleInfo({ adData, handleShowReviews, id, baseUrl }) {
    const loggedInUserEmail = localStorage.getItem('email');
    const navigate = useNavigate();

    //** Редактирование объявления */
    const [showEditor, setShowEditor] = useState(false);
    const handleShowEditor = () => {
        setShowEditor(true); // Показываем окно с редактированием
    };
    const handleCloseEditor = () => {
        setShowEditor(false);// Скрываем окно с редактированием
    };


    /** Снять с публикации объявление  */
    const handleRemoveFromPublication = () => {
        const accessToken = localStorage.getItem('access_token');
        axios.delete(`http://127.0.0.1:8090/ads/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                console.log('Объявление удалено');
                navigate('/profile');
            })
            .catch((error) => {
                console.error('Ошибка при удалении объявления', error);
                navigate('/login');
            });
    };

    return (
        <div className={styles.article__right}>
            <div className={styles.article__block}>
                <h3 className={styles.article__title}>{adData.title}</h3>
                <div className={styles.article__info}>
                    <p className={styles.article__date}><TimeFormatter time={adData.created_on} /></p>
                    <p className={styles.article__city}>{adData.user.city}</p>
                    <a className={styles.article__link} onClick={handleShowReviews}><ReviewCount adId={id} /> отзыва</a>
                </div>
                <p className={styles.article__price}>{adData.price}</p>

                {adData.user.email === loggedInUserEmail ? (
                    // Кнопка удаление, если объявление пользователя
                    <div className={styles.buttons}>
                        <div onClick={handleShowEditor} >
                            <Button text="Редактировать" view="primary" />
                        </div>
                        <div onClick={handleRemoveFromPublication} >
                            <Button text="Снять с публикации" view="primary" />
                        </div>

                    </div>


                ) : (
                    // Номер телефона
                    <PhoneNumber phoneNumber={adData.user.phone} />
                )}
                {showEditor && (
                    <div className={styles.modal__overlay}>
                        <div className={styles.wrapper}>
                            <div className={styles.container_bg}>
                                <div className={styles.modal__block}>
                                    <div className={styles.modal__content}>
                                        <ArticleEditor adData={adData} onClose={handleCloseEditor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.article__author}>
                    <div className={styles.author__img}>
                        <img src={`${baseUrl}${adData.user.avatar}`} alt="avatar" />
                    </div>
                    <div className={styles.author__cont}>

                        {adData.user.email === loggedInUserEmail ? (
                            // Кнопка удаление, если объявление пользователя
                            <Link to="/profile">
                                <p className={styles.author__name}>{adData.user.name}</p>
                                <p className={styles.author__about}>
                                    Продает товары с <DateFormatter dateStr={adData.created_on} />
                                </p>
                            </Link>


                        ) : (
                            <a href={`/seller/${id}`}>
                                <p className={styles.author__name}>{adData.user.name}</p>
                                <p className={styles.author__about}>
                                    Продает товары с <DateFormatter dateStr={adData.created_on} />
                                </p>
                            </a>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleInfo;
