import { Link } from 'react-router-dom';
import './RegisterForm.css';    

function RegisterForm() {
    return (
        <div className="auth-form-content">
            <h2 className="auth-title">Створити акаунт</h2>
            
            <p className="auth-subtitle">
                Вже є акаунт?
                <Link to="/auth/login" className="auth-switch-btn">
                    Увійти
                </Link>
            </p>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <label>Ім'я</label>
                    <input type="text" placeholder="Введіть ваше ім'я" />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Введіть ваш email" />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="Введіть пароль" />
                </div>

                <button className="auth-submit-btn">Створити акаунт</button>
            </form>
        </div>
    );
}

export default RegisterForm;