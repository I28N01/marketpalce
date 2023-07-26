import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from '../UI/Button/Button';
import styles from './UserProfile.module.scss';
import { Link, useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        city: "",
    });
    const accessToken = localStorage.getItem("access_token");
    const handleButtonClick = () => {
        localStorage.clear()
        navigate('/');
    };
    useEffect(() => {
        // Fetch the user data from the server on component mount
        fetchUser();
    }, []);

    const fetchUser = () => {
        axios.get('http://127.0.0.1:8090/user', {
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
                window.location.reload();
                // Handle errors if needed
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parameters for the PATCH request
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

        // Execute the PATCH request to update user data
        axios(config)
            .then((response) => {
                console.log("Response:", response.data);
                // Handle the server response if needed
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle errors if needed

            });
    };

    if (!user) {
        return null; // You can return a loading indicator or any other content when user data is not available yet
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
                                <a href="" target="_self">
                                    <img src={`http://127.0.0.1:8090/${formData.avatar}`} alt="" />
                                </a>
                            </div>
                            <a className={styles.settings__change_photo} href="" target="_self">
                                Заменить
                            </a>
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
