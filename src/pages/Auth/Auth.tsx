import { Routes, Route, Navigate } from 'react-router-dom';
import './Auth.css';
import authImage from '../../assets/card_1.jpg'; 
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

function Auth() {
    return (
        <section className="auth-page-wrapper" id="auth">
            <div className="auth-container">
                
                <div className="auth-image-box">
                    <img src={authImage} alt="Leafea Auth" className="auth-image" />
                    <div className="auth-image-overlay">
                        <h2>Leafea</h2>
                        <p>Твій настрій. Твій контент.</p>
                    </div>
                </div>

                <div className="auth-form-box">
                    <Routes>
                        <Route path="/" element={<Navigate to="register" replace />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="login" element={<LoginForm />} />
                    </Routes>
                </div>
            </div>
        </section>
    );
}

export default Auth;