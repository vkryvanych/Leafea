import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import './LoginForm.css';

function LoginForm() {
    const { login, isLoading, error } = useAuth();

    return (
        <div className="auth-form-content">
            <h2 className="auth-title">З поверненням!</h2>
            
            <p className="auth-subtitle">
                Немає акаунту?
                <Link to="/auth/register" className="auth-switch-btn">
                    Зареєструватися
                </Link>
            </p>

            <form className="auth-form" onSubmit={login}>
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
                    {isLoading ? 'Зачекайте...' : 'Увійти'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;