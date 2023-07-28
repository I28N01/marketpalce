import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '../UI/Button/Button';
import styles from './UserProfile.module.scss';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        city: "",
        avatar: "",
    });
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
    const [image, setImage] = useState(null);
    const [profileUpdated, setProfileUpdated] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => { //получаем данные пользователя
        axios.get('http://127.0.0.1:8090/user/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    surname: response.data.surname,
                    phone: response.data.phone,
                    city: response.data.city,
                });

            })
            .catch((error) => {
                console.error('Ошибка при выполнении запроса на получение данных пользователя:', error);
                localStorage.removeItem("access_token");
                navigate('/login');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => { //обновляем данные пользователя
        e.preventDefault();
        const config = {
            method: "PATCH",
            url: "http://127.0.0.1:8090/user",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            data: formData,
        };

        axios(config)
            .then((response) => {
                console.log("Response:", response.data);

                if (response.status === 200) {
                    setProfileUpdated(true);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleImageUpload = async (e) => { // Обновление аватара
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Загружаем изображение на сервер, если выбран файл
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await axios.post('http://127.0.0.1:8090/user/avatar', formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                window.location.reload();
                console.log("Image uploaded:", response.data);
            } catch (error) {
                console.error("Error uploading image:", error);
                // Обработка ошибок загрузки изображения, если необходимо
            }
        }
    };

    const handleButtonClick = () => {
        localStorage.clear();
        setAccessToken(null);
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div>
            <h2 className={styles.main__h2}>Здравствуйте, {user.name}</h2>
            <div className={styles.main__profile}>
                <div className={styles.profile__content}>
                    <h3 className={styles.profile__title}>Настройки профиля</h3>
                    <div className={styles.profile__settings}>
                        <div className={styles.settings__left}>
                            <div className={styles.settings__img}>
                                <img src={`http://127.0.0.1:8090/${user.avatar}`} alt="avatar" />
                            </div>

                            <div className={styles.input__wrapper}>
                                <input name="file" type="file" id="input__file" className={`${styles.input} ${styles.input__file}`} onChange={handleImageUpload} />
                                <label htmlFor="input__file" className={styles.input__file_button}>
                                    <span className={styles.input__file_button_text}>Заменить</span>

                                </label>
                            </div>
                        </div>
                        <div className={styles.settings__right}>
                            <form className={styles.settings__form} onSubmit={handleSubmit}>
                                <div className={styles.settings__div}>
                                    <label htmlFor="fname">Имя</label>
                                    <input className={styles.settings__f_name} name="name" type="text" value={formData.name} placeholder="" onChange={handleChange} />
                                </div>

                                <div className={styles.settings__div}>
                                    <label htmlFor="lname">Фамилия</label>
                                    <input className={styles.settings__l_name} name="surname" type="text" value={formData.surname} placeholder="" onChange={handleChange} />
                                </div>

                                <div className={styles.settings__div}>
                                    <label htmlFor="city">Город</label>
                                    <input className={styles.settings__city} name="city" type="text" value={formData.city} placeholder="" onChange={handleChange} />
                                </div>

                                <div className={styles.settings__div}>
                                    <label htmlFor="phone">Телефон</label>
                                    <input className={styles.settings__phone} name="phone" type="tel" value={formData.phone} placeholder="+79161234567" onChange={handleChange} />
                                    {profileUpdated && <div className={styles.text}>Профиль обновлен</div>}
                                </div>

                                <div className={styles.buttons}>
                                    <Button text="Сохранить" view="primary" type="submit" />
                                    <div onClick={handleButtonClick}><Button text="Выйти" view="tertiary" /></div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
