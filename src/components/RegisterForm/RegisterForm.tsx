import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { SyntheticEvent } from 'react';
import './RegisterForm.css';    

function RegisterForm() {
    const { register } = useAuth();

    const handleRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        register(); 
    };

    return (
        <div className="auth-form-content">
            <h2 className="auth-title">Створити акаунт</h2>
            
            <p className="auth-subtitle">
                Вже є акаунт?
                <Link to="/auth/login" className="auth-switch-btn">
                    Увійти
                </Link>
            </p>

            <form className="auth-form" onSubmit={handleRegister}>
                <div className="input-group">
                    <label>Ім'я</label>
                    <input type="text" placeholder="Введіть ваше ім'я" required />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Введіть ваш емайл" required />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="Введіть пароль" required />
                </div>

                <button type="submit" className="auth-submit-btn">Створити акаунт</button>
            </form>
        </div>
    );
}

export default RegisterForm;