import './Header.css'
import logo from '../../assets/logo.png';

function Header() {
    return (
      <header className="navbar">
      <div className="navbar-container">
       
        <div className="logo-section">
          <div className="logo-circle">
            <img src= {logo} alt="Leafea" className="logo-icon" />
          </div>
        </div>

     
        <nav className="nav-menu">
          <a href="#about" className="nav-link">Про нас</a>
          <a href="#contacts" className="nav-link">Контакти</a>
        </nav>

        
        <div className="auth-section">
          <a href="#" className="nav-link">Реєстрація</a>
          <a href="#" className="btn-login">Вхід</a>
        </div>
      </div>
    </header>
    );
}

export default Header;
