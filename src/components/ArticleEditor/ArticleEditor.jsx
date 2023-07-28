import React, { useState } from 'react';
import axios from 'axios';
import { handleFileInputClick, handleImageChange } from '../UI/ImageUpload/ImageUpload';
import styles from './ArticleEditor.module.scss';

function ArticleEditor({ adData, onClose }) {
    const accessToken = localStorage.getItem('access_token');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

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

    const renderImageUpload = () => {
        const imageUploadArray = Array.from({ length: 5 });
        return imageUploadArray.map((_, index) => (
            <div className={styles.form_newArt__img} onClick={handleFileInputClick(index)} key={index}>
                <input
                    className={styles.hidden}
                    type="file"
                    id={`fileInput${index}`}
                    name={`files${index}`}
                    accept="image/jpeg"
                    onChange={(event) => handleImageChange(index, event, setImagePreviews, images, setImages, imagePreviews)}
                />
                {imagePreviews[index] && <img src={imagePreviews[index]} alt="Preview" className={styles.form_newArt__preview} />}
                <div className={styles.form_newArt__img_cover}></div>
            </div>
        ));
    }

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8090/ads/${adData.id}`, updatedData, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            uploadImage();
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
        }
    };

    const uploadImage = async () => {
        if (images.length > 0) {
            try {
                for (let i = 0; i < images.length; i++) {
                    const formData = new FormData();
                    formData.append('file', images[i]);
                    await axios.post(`http://127.0.0.1:8090/ads/${adData.id}/image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                }
                onClose();
            } catch (error) {
                console.error('Ошибка при загрузке изображения:', error);
            }
        } else {
            onClose();
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
                                {renderImageUpload()}
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
