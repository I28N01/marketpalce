import Button from '../../components/UI/Button/Button';
import styles from './Registration.module.scss';
import { useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate();
    const handleSignUp = () => navigate('/profile');

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <img className={styles.logo} src="/assets/img/logo_modal.png" alt="logo" />
                    <input className={styles.input} placeholder="Email" type="text" />
                    <input className={styles.input} placeholder="Пароль" type="password" />
                    <input className={styles.input} placeholder="Повторите пароль" type="password" />
                    <input className={styles.input} placeholder="Имя (необязательно)" type="text" />
                    <input className={styles.input} placeholder="Фамилия (необязательно)" type="text" />
                    <input className={styles.input} placeholder="Город (необязательно)" type="text" />
                    <div onClick={handleSignUp}><Button text="Зарегистрироваться" view="primary" /></div>
                </form>
            </div>
        </div>
    );
};

export default Registration;