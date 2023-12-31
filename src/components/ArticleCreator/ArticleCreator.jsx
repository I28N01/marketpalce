import React, { useState } from 'react';
import axios from 'axios';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './ArticleCreator.module.scss';
import { handleFileInputClick, handleImageChange } from '../UI/ImageUpload/ImageUpload'

function ArticleCreator({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]); // массив с превью для каждого изображения
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {  // Отправка текста для создания объявления
        e.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:8090/ads?title=${title}&description=${description}&price=${price}`, {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            // Получаем ID созданного объявления из ответа сервера
            const newAdId = response.data.id;

            // Перенаправляем пользователя на страницу с полученным ID
            uploadImage(newAdId); 
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            navigate(`/login`);
        }
    };

    const uploadImage = async (adId) => { // Отправка изображений для создания объявления
        if (images.length > 0) { // Проверяем, что массив изображений не пустой
            try {
                for (let i = 0; i < images.length; i++) {
                    const formData = new FormData();
                    formData.append('file', images[i]); // Отправляем каждое изображение отдельным запросом

                    await axios.post(`http://127.0.0.1:8090/ads/${adId}/image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                }

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
                        <div className={styles.modal__btn_close} onClick={onClose}>
                            <div className={styles.modal__btn_close_line}></div>
                        </div>
                        <form className={styles.modal__form_newArt} onSubmit={handleSubmit}>
                            <div className={styles.form_newArt__block}>
                                <label htmlFor="formName">Название</label>
                                <input
                                    className={styles.form_newArt__input}
                                    type="text"
                                    id="formName"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Введите название"
                                />
                            </div>
                            <div className={styles.form_newArt__block}>
                                <label htmlFor="formArea">Описание</label>
                                <textarea
                                    className={styles.form_newArt__area}
                                    id="formArea"
                                    cols="auto"
                                    rows="10"
                                    placeholder="Введите описание"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className={styles.form_newArt__block}>
                                <p className={styles.form_newArt__p}>Фотографии товара<span>не более 5 фотографий</span></p>
                                <div className={styles.form_newArt__bar_img}>
                                    {renderImageUpload()}
                                </div>
                            </div>
                            <div className={`${styles.form_newArt__block} ${styles.block_price}`}>
                                <label htmlFor="formPrice">Цена</label>
                                <input
                                    className={styles.form_newArt__input_price}
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
