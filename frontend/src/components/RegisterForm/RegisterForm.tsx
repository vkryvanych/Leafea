import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './RegisterForm.css';    

function RegisterForm() {
    const { register, isLoading, error } = useAuth();

    return (
        <div className="auth-form-content">
            <h2 className="auth-title">Створити акаунт</h2>
            
            <p className="auth-subtitle">
                Вже є акаунт?
                <Link to="/auth/login" className="auth-switch-btn">
                    Увійти
                </Link>
            </p>

            <form className="auth-form" onSubmit={register}>
                <div className="input-group">
                    <label>Ім'я</label>
                    <input name="name" type="text" placeholder="Введіть ваше ім'я" required />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="Введіть ваш емайл" required />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input name="password" type="password" placeholder="Введіть пароль" required />
                </div>
                {error && <div className="auth-error-message">{error}</div>}
                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading ? 'Створюємо...' : 'Створити акаунт'}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;