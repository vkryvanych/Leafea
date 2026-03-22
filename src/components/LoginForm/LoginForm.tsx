import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import type { SyntheticEvent } from 'react';
import './LoginForm.css';

function LoginForm() {
    
    const { login } = useAuth();
    const handleLogin = (e: SyntheticEvent) => {
        e.preventDefault(); 
        login();
    };

    return (
        <div className="auth-form-content">
            <h2 className="auth-title">З поверненням!</h2>
            
            <p className="auth-subtitle">
                Немає акаунту?
                <Link to="/auth/register" className="auth-switch-btn">
                    Зареєструватися
                </Link>
            </p>

    
            <form className="auth-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Введіть ваш емайл" required />
                </div>

                <div className="input-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="Введіть пароль" required />
                </div>

                <button type="submit" className="auth-submit-btn">Увійти</button>
            </form>
        </div>
    );
}

export default LoginForm;