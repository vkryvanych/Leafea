import { useState, useRef, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 
import girl1_ava from '../../assets/girl1_ava.jpg';
import girl2_ava from '../../assets/girl2_ava.jpg';
import girl3_ava from '../../assets/girl3_ava.jpg';
import girl4_ava from '../../assets/girl4_ava.jpg';
import angel_ava from '../../assets/angel_ava.jpg';
import cat1_ava from '../../assets/cat1_ava.jpg';
import cat2_ava from '../../assets/cat2_ava.jpg';
import butterfly_ava from '../../assets/butterfly_ava.jpg';
import asa_ava from '../../assets/asa_ava.jpg';
import angel2_ava from '../../assets/angel2_ava.jpg';
import man_ava from '../../assets/man_ava.jpg';
import rise_ava from '../../assets/rise_ava.jpg';

import './CabinetHeader.css';

interface CabinetHeaderProps {
    userData: { name: string; avatar: string };
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onOpenAddModal: () => void; 
}

function CabinetHeader({ userData, activeTab, setActiveTab, onOpenAddModal }: CabinetHeaderProps) {
    
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
    const [isChoosingAvatar, setIsChoosingAvatar] = useState(false); 
    const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
    
    const [currentAvatar, setCurrentAvatar] = useState(() => {
        return localStorage.getItem('userAvatar') || userData.avatar;
    });

    const navigate = useNavigate(); 
    const { logout } = useAuth(); 
    
    const menuRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null); 
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    
    const predefinedAvatars = [
        girl2_ava, girl1_ava, cat1_ava, angel_ava, girl4_ava, butterfly_ava,
        girl3_ava, asa_ava, angel2_ava, man_ava, rise_ava, cat2_ava
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsAddMenuOpen(false);
            }
            
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
                setIsChoosingAvatar(false);
                setIsConfirmingLogout(false);
            }
        
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
                setIsChoosingAvatar(false);
                setIsConfirmingLogout(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGoToTest = () => {
        setIsAddMenuOpen(false); 
        navigate('/test');       
    };

    const handleOpenModal = () => {
        setIsAddMenuOpen(false); 
        onOpenAddModal();        
    };

    const handleAvatarSelect = (ava: string) => {
        setCurrentAvatar(ava);
        localStorage.setItem('userAvatar', ava);
        
        setIsChoosingAvatar(false);
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false); 
        setIsConfirmingLogout(false);
    };

    const handleMobileTabClick = (tab: string) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false); 
        setIsConfirmingLogout(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setIsConfirmingLogout(false);
        setIsChoosingAvatar(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsConfirmingLogout(false);
        setIsChoosingAvatar(false);
    };

    return (
        <header className="cabinet-header">
            
            <div className="cabinet-logo-container" ref={menuRef}>
                <button 
                    className="cabinet-add-btn"
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                    title="Додати рекомендацію"
                >
                    +
                </button>

                {isAddMenuOpen && (
                    <div className="cabinet-dropdown">
                        <button onClick={handleOpenModal}>Додати рекомендацію вручну</button>
                        <button onClick={handleGoToTest}>Перейти до тесту</button>
                    </div>
                )}
            </div>

            <nav className="cabinet-nav-links desktop-only">
                <Link to="/" className="nav-item">На головну</Link>
                <button className={`nav-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Всі рекомендації</button>
                <button className={`nav-item ${activeTab === 'inProgress' ? 'active' : ''}`} onClick={() => setActiveTab('inProgress')}>В процесі</button>
                <button className={`nav-item ${activeTab === 'watched' ? 'active' : ''}`} onClick={() => setActiveTab('watched')}>Переглянуто</button>
                <button className={`nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>Цитати</button>
            </nav>

            <div 
                className="cabinet-user-profile desktop-only" 
                ref={profileRef} 
                onClick={toggleProfileMenu}
            >
                <img 
                    src={currentAvatar} 
                    alt="User Avatar" 
                    className="cabinet-avatar" 
                    title="Налаштування профілю" 
                />
                <span className="cabinet-username">{userData.name}</span>

                {isProfileMenuOpen && (
                    <div className="cabinet-dropdown profile-dropdown" onClick={(e) => e.stopPropagation()}>
                        {!isChoosingAvatar && !isConfirmingLogout && (
                            <>
                                <button onClick={() => setIsChoosingAvatar(true)}>Змінити аватарку</button>
                                <button className="logout-btn" onClick={() => setIsConfirmingLogout(true)}>Вийти з акаунту</button>
                            </>
                        )}
                        
                        {isConfirmingLogout && (
                            <div className="logout-confirm-container">
                                <p className="logout-confirm-title">Ви впевнені?</p>
                                <div className="logout-confirm-buttons">
                                    <button className="confirm-yes-btn" onClick={logout}>Так</button>
                                    <button className="confirm-no-btn" onClick={() => setIsConfirmingLogout(false)}>Ні</button>
                                </div>
                            </div>
                        )}

                        {isChoosingAvatar && (
                            <div className="avatar-selection">
                                <p className="avatar-selection-title">Обери новий стиль:</p>
                                <div className="avatar-grid">
                                    {predefinedAvatars.map((ava, index) => (
                                        <img 
                                            key={index} src={ava} alt={`Avatar option ${index}`} 
                                            className="avatar-option" onClick={() => handleAvatarSelect(ava)}
                                        />
                                    ))}
                                </div>
                                <button className="back-btn" onClick={() => setIsChoosingAvatar(false)}>Назад</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="cabinet-user-profile mobile-only" ref={mobileMenuRef}>
                <div className="mobile-trigger" onClick={toggleMobileMenu}>
                    <img src={currentAvatar} alt="User Avatar" className="cabinet-avatar" />
                    <span className="cabinet-username">{userData.name}</span>
                    <span className="burger-icon">☰</span>
                </div>

                {isMobileMenuOpen && (
                    <div className="cabinet-dropdown profile-dropdown mobile-dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
                        
                        {!isChoosingAvatar && !isConfirmingLogout && (
                            <>
                                <p className="mobile-section-title">Вкладки</p>
                                <button className={activeTab === 'all' ? 'active' : ''} onClick={() => handleMobileTabClick('all')}>Всі рекомендації</button>
                                <button className={activeTab === 'inProgress' ? 'active' : ''} onClick={() => handleMobileTabClick('inProgress')}>В процесі</button>
                                <button className={activeTab === 'watched' ? 'active' : ''} onClick={() => handleMobileTabClick('watched')}>Переглянуто</button>
                                <button className={activeTab === 'quotes' ? 'active' : ''} onClick={() => handleMobileTabClick('quotes')}>Цитати</button>
                                <Link to="/" className="nav-item-mobile">На головну</Link>
                                
                                <div className="mobile-dropdown-divider"></div>
                                
                                <p className="mobile-section-title">Профіль</p>
                                <button onClick={() => setIsChoosingAvatar(true)}>Змінити аватарку</button>
                                <button className="logout-btn" onClick={() => setIsConfirmingLogout(true)}>Вийти з акаунту</button>
                            </>
                        )}
                        
                        {isConfirmingLogout && (
                            <div className="logout-confirm-container">
                                <p className="logout-confirm-title">Ви впевнені?</p>
                                <div className="logout-confirm-buttons">
                                    <button className="confirm-yes-btn" onClick={logout}>Так</button>
                                    <button className="confirm-no-btn" onClick={() => setIsConfirmingLogout(false)}>Ні</button>
                                </div>
                            </div>
                        )}

                        {isChoosingAvatar && (
                            <div className="avatar-selection">
                                <p className="avatar-selection-title">Обери новий стиль:</p>
                                <div className="avatar-grid">
                                    {predefinedAvatars.map((ava, index) => (
                                        <img 
                                            key={index} src={ava} alt={`Avatar option ${index}`} 
                                            className="avatar-option" onClick={() => handleAvatarSelect(ava)}
                                        />
                                    ))}
                                </div>
                                <button className="back-btn" onClick={() => setIsChoosingAvatar(false)}>Назад</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </header>
    );
}

export default CabinetHeader;