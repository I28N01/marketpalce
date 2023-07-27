
import React, { useState } from 'react';
import styles from '../Article/Article.module.scss';

function ArticleImageGallery({ images, baseUrl }) {
    const [mainImage, setMainImage] = useState(images && images.length > 0 ? `${baseUrl}${images[0].url}` : '../assets/img/no-image.jpg');

    const handleShowImage = (imageUrl) => {
        setMainImage(imageUrl);
    };

    return (
        <div className={styles.article__left}>
            <div className={styles.article__fill_img}>
                <div className={styles.article__img}>
                    <img src={mainImage} alt="Изображение объявления" />
                </div>
                <div className={styles.article__img_bar}>
                    {images?.map((image) => (
                        <div className={styles.article__img_bar_div} key={image.id}>
                            <img src={`${baseUrl}${image.url}`} alt="picture" onClick={() => handleShowImage(`${baseUrl}${image.url}`)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArticleImageGallery;
