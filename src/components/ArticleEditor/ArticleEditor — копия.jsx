import styles from "./ArticleEditor.module.scss";
import React, { useState } from 'react';
import axios from 'axios';

function ArticleEditor({ adData, onClose }) {
    const [updatedData, setUpdatedData] = useState({
        title: adData.title,
        description: adData.description,
        price: adData.price,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            await axios.patch(`http://127.0.0.1:8090/ads/${adData.id}`, updatedData, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // If the request is successful, close the editor modal
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal__btn_close} onClick={onClose}>
                <div className={styles.modal__btn_close_line}></div>
            </div>
            <div className={styles.modal__block}>
                <div className={styles.modal__content}>
                    <h3 className={styles.modal__title}>Редактировать объявление</h3>
                    <form className={`${styles.modal__form_newArt} ${styles.form_newArt}`} action="#">
                        <div className={styles.form_newArt__block}>
                            <label htmlFor="name">Название</label>
                            <input
                                className={styles.form_newArt__input}
                                type="text"
                                name="title"
                                placeholder="Введите название"
                                value={updatedData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.form_newArt__block}>
                            <label htmlFor="text">Описание</label>
                            <textarea
                                className={styles.form_newArt__area}
                                name="description"
                                id="formArea"
                                cols="auto"
                                rows="10"
                                placeholder="Введите описание"
                                value={updatedData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.form_newArt__block}>
                            <p className={styles.form_newArt__p}>Фотографии товара<span>не более 5 фотографий</span></p>
                            <div className={styles.form_newArt__bar_img}>
                                <div className={styles.form_newArt__img}>
                                    <img src="" alt="" />
                                    <div className={styles.form_newArt__img_cover}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.form_newArt__block} ${styles.block_price}`}>
                            <label htmlFor="price">Цена</label>
                            <input
                                className={styles.form_newArt__input_price}
                                type="text"
                                name="price"
                                value={updatedData.price}
                                onChange={handleInputChange}
                            />
                            <div className={styles.form_newArt__input_price_cover}></div>
                        </div>

                        <button className={styles.form_newArt__btn_pub} id="btnPublish" onClick={handleSaveChanges}>
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ArticleEditor;
