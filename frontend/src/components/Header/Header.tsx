import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import './Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
   
    useLocation(); 
    
    const { isLoggedIn } = useAuth(); 

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="navbar">
            <div className="navbar-container">
                
                <div className="logo-section">
                    <Link to="/" onClick={closeMenu}>
                        <div className="logo-circle">
                            <img src={logo} alt="Leafea" className="logo-icon" />
                        </div>
                    </Link>
                </div>

                <button 
                    className={`burger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                    <Link to="/#about" className="nav-link" onClick={closeMenu}>Про нас</Link>
                    <Link to="/contact" className="nav-link" onClick={closeMenu}>Контакти</Link>
      
                    <div className="mobile-auth-section">
                        {isLoggedIn ? (
                            <Link to="/cabinet" className="btn-cabinet" onClick={closeMenu}>Особистий кабінет</Link>
                        ) : (
                            <>
                                <Link to="/auth/register" className="nav-link" onClick={closeMenu}>Реєстрація</Link>
                                <Link to="/auth/login" className="btn-login" onClick={closeMenu}>Вхід</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="auth-section desktop-auth-section"> 
                    {isLoggedIn ? (
                        <Link to="/cabinet" className="btn-cabinet">Особистий кабінет</Link>
                    ) : (
                        <>
                            <Link to="/auth/register" className="nav-link">Реєстрація</Link>
                            <Link to="/auth/login" className="btn-login">Вхід</Link>
                        </>
                    )}
                </div>
                
            </div>
        </header>
    );
}

export default Header;