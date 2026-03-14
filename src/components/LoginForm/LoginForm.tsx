import { Link } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
    return (
        <div className="auth-form-content">
            <h2 className="auth-title">З поверненням!</h2>
            
            <p className="auth-subtitle">
                Немає акаунту?
                <Link to="/auth/register" className="auth-switch-btn">
                    Зареєструватися
                </Link>
            </p>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Введіть ваш email" />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="Введіть пароль" />
                </div>

                <button className="auth-submit-btn">Увійти</button>
            </form>
        </div>
    );
}

export default LoginForm;