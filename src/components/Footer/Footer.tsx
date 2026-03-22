import './Footer.css';
import logo from '../../assets/logo.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 

function Footer() {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    const handleCabinetClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (isLoggedIn) {
            navigate('/cabinet'); 
        } else {
            navigate('/auth/login');
        }
    };

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-logo-wrapper">
                        <Link to="/">
                            <div className="footer-logo-circle">
                                <img src={logo} alt="Leafea Logo" className="footer-logo-icon" />
                            </div>
                        </Link>
                    </div>
                    <div className="footer-description">
                        <p>
                            Leafea - це місце, де твій настрій зустрічається з ідеальним контентом. 
                            Від культових фільмів до захопливих книг, ми підберемо саме те, що тобі зараз потрібно. 
                            Спробуй і побачиш, як зміниться твій вечір!
                        </p>
                    </div>
                    <nav className="footer-nav">
                        <ul className="footer-links">
                            <li><Link to="/#about">Про нас</Link></li>
                            
                            <li>
                                <Link to="/cabinet" onClick={handleCabinetClick}>
                                    Особистий кабінет
                                </Link>
                            </li>
                            
                            {!isLoggedIn && (
                                <li><Link to="/auth/register">Вхід / Реєстрація</Link></li>
                            )}

                            <li><Link to="/contact">Контакти</Link></li>
                        </ul>
                    </nav>

                </div>
            </div>
            <div className="footer-bottom">
                <p>@2026 Leafea. Designed by <span className="designer-name">Victoria Kryvanych</span></p>
            </div>
        </footer>
    );
}

export default Footer;