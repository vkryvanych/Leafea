import './Footer.css';
import logo from '../../assets/logo.png'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-logo-wrapper">
                        <a href="/">
                            <div className="footer-logo-circle">
                                <img src={logo} alt="Leafea Logo" className="footer-logo-icon" />
                            </div>
                        </a>
                    </div>
                    <div className="footer-description">
                        <p>
                            Leafea — це місце, де твій настрій зустрічається з ідеальним контентом. 
                            Від культових фільмів до захопливих книг, ми підберемо саме те, що тобі зараз потрібно. 
                            Спробуй і побачиш, як зміниться твій вечір!
                        </p>
                    </div>
                    <nav className="footer-nav">
                        <ul className="footer-links">
                            <li><a href="#about">Про нас</a></li>
                            <li><a href="#cabinet">Особистий кабінет</a></li>
                            <li><a href="#auth">Вхід / Реєстрація</a></li>
                            <li><a href="#contacts">Контакти</a></li>
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