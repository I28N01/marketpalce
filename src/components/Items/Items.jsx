import styles from "./Items.module.scss";
import TimeFormatter from '../UI/TimeFormatter/TimeFormatter';

function Items({ data, searchTerm }) {
    let filteredData = data;

    if (searchTerm !== undefined) {
        filteredData = data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div className={styles.cards}>
            {filteredData.map((ad, index) => (
                <div key={index} className={styles.cards__item}>
                    <div className={styles.cards__card}>
                        <div className={styles.card__image}>
                            <a href={`../ads/${ad.id}`}>
                                <img src={ad.images && ad.images.length > 0 ? `http://127.0.0.1:8090/${ad.images[0].url}` : '../assets/img/no-image.jpg'} alt="Изображение объявления" />
                            </a>
                        </div>
                        <div className={styles.card__content}>
                            <a href={`../ads/${ad.id}`}>
                                <h3 className={styles.card__title}>{ad.title}</h3>
                            </a>
                            <p className={styles.card__price}>{ad.price}</p>
                            <p className={styles.card__place}>{ad.user.city}</p>
                            <p className={styles.card__date}><TimeFormatter time={ad.created_on} /></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Items;


