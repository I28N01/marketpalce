import Button from '../../components/UI/Button/Button';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const userData = { email, password };

        try {
            const response = await axios.post('http://127.0.0.1:8090/auth/login', userData);
            const accessToken = response.data.access_token;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('email', email)
            console.log(accessToken)
            console.log(localStorage.getItem('email'))
            navigate('/profile');
        } catch (error) {
            console.error('Ошибка при выполнении POST-запроса:', error);
            setError('Неверный email или пароль');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <img className={styles.logo} src="/assets/img/logo_modal.png" alt="logo" />
                    <input className={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className={styles.input} placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button text="Войти" view="primary" type="su" />
                    {error && <p>{error}</p>}
                    <Link to="/registration"><Button text="Зарегистрироваться" view="tertiary" /></Link>
                </form>
            </div>
        </div>
    );
};

export default Login;


