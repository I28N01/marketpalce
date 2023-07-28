import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './Registration.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleButtonClick = () => {
        navigate('/');
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // проверяем что оба веденные пароли совпадают
        if (formData.password !== formData.repeatPassword) {
            console.error('Passwords do not match.');
            return;
        }

        // Создаем объект для отправки на сервер
        const registrationData = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            city: formData.city,
        };

        // Отправка данных на сервер
        axios.post('http://127.0.0.1:8090/auth/register', registrationData)
            .then((response) => {
                console.log('Registration successful:', response.data);
                setSuccessMessage('Registration successful! Redirecting to the login page...');
                // Редайрект на страницу входа
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch((error) => {
                console.error('Error during registration:', error);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSignUp}>
                    <img className={styles.logo} src="/assets/img/logo_modal.png" alt="logo" />
                    <input
                        className={styles.input}
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        placeholder="Повторите пароль"
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        placeholder="Имя (необязательно)"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        placeholder="Фамилия (необязательно)"
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        placeholder="Город (необязательно)"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                    <Button text="Зарегистрироваться" view="primary" type="submit" />
                    <div onClick={handleButtonClick}><Button text="На главную" view="tertiary" /></div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
