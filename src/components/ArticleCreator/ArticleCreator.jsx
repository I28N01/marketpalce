import styles from "./ArticleCreator.module.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

function ArticleCreator() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // Use null for image state
    const accessToken = localStorage.getItem('access_token');
    const handleFileInputClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`http://127.0.0.1:8090/ads?title=${title}&description=${description}&price=${price}`, {

            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            // Получаем ID созданного объявления из ответа сервера
            const newAdId = response.data.id;

            // Перенаправляем пользователя на страницу с полученным ID
            uploadImage(newAdId); // Call the function to upload the image with the newAdId
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            navigate(`/login`);
        }
    };

    const uploadImage = async (adId) => {
        if (image) {
            try {
                const formData = new FormData();
                formData.append('file', image);

                await axios.post(`http://127.0.0.1:8090/ads/${adId}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                navigate(`/ads/${adId}`);
            } catch (error) {
                console.error('Ошибка при загрузке изображения:', error);
                navigate(`/ads/${adId}`);
            }
        } else {
            navigate(`/ads/${adId}`);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container_bg}>
                <div className={styles.modal__block}>
                    <div className={styles.modal__content}>
                        <h3 className={styles.modal__title}>Новое объявление</h3>
                        <div className={styles.modal__btn_close}>
                            <div className={styles.modal__btn_close_line}></div>
                        </div>
                        <form className={styles.modal__form_newArt} onSubmit={handleSubmit}>
                            <div className={styles.form_newArt__block}>
                                <label htmlFor="formName">Название</label>
                                <input className={styles.form_newArt__input}
                                    type="text"
                                    id="formName"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Введите название" />
                            </div>
                            <div className={styles.form_newArt__block}>
                                <label htmlFor="formArea">Описание</label>
                                <textarea className={styles.form_newArt__area}
                                    id="formArea"
                                    cols="auto"
                                    rows="10"
                                    placeholder="Введите описание"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className={styles.form_newArt__block}>
                                <p className={styles.form_newArt__p}>Фотографии товара<span>не более 5 фотографий</span></p>
                                <div className={styles.form_newArt__bar_img} onClick={handleFileInputClick}>
                                    {/* Добавляем поле для загрузки изображения */}
                                    <div className={styles.form_newArt__img}>
                                        <input
                                            className={styles.hidden}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            accept="image/jpeg"
                                            onChange={(e) => setImage(e.target.files[0])} // Use the selected file as the image state
                                        />
                                        <div className={styles.form_newArt__img_cover}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.form_newArt__block} ${styles.block_price}`}>
                                <label htmlFor="formPrice">Цена</label>
                                <input className={styles.form_newArt__input_price}
                                    type="text"
                                    id="formPrice"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <div className={styles.form_newArt__input_price_cover}></div>
                            </div>
                            <Button text="Опубликовать" view="modal" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCreator;
