import styles from "./Article.module.scss";

function Article() {
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
                        <h3 className={styles.article__title}>Ракетка для большого тенниса Triumph Pro STС Б/У</h3>
                        <div className={styles.article__info}>
                            <p className={styles.article__date}>Сегодня в 10:45</p>
                            <p className={styles.article__city}>Санкт-Петербург</p>
                            <a className={styles.article__link} href="" target="_blank" rel="">23 отзыва</a>
                        </div>
                        <p className={styles.article__price}>2 200 ₽</p>
                        <button className={styles.article__btn} >Показать&nbsp;телефон
                            <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                        </button>
                        <div className={styles.article__author}>
                            <div className={styles.author__img}>
                                <img src="" alt="" />
                            </div>
                            <div className={styles.author__cont}>
                                <p className={styles.author__name}>Кирилл</p>
                                <p className={styles.author__about}>Продает товары с августа 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Article;