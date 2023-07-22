import Button from '../../components/UI/Button/Button';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <img className={styles.logo} src="/assets/img/logo_modal.png" alt="logo" />
                    <input className={styles.input} placeholder="Email" type="text" />
                    <input className={styles.input} placeholder="Пароль" type="password"
                    />
                    <Button text="Войти" view="primary" />
                    <Link to="/registration"><Button text="Зарегистрироваться" view="tertiary" /></Link>
                </form>
            </div>
        </div>
    );
};

export default Login;