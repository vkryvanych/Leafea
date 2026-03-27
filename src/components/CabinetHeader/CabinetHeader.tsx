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
    const [isChoosingAvatar, setIsChoosingAvatar] = useState(false); 
    
   
    const [currentAvatar, setCurrentAvatar] = useState(() => {
        return localStorage.getItem('userAvatar') || userData.avatar;
    });

    const navigate = useNavigate(); 
    const { logout } = useAuth(); 
    
    const menuRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null); 
    
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

            <nav className="cabinet-nav-links">
                <Link to="/" className="nav-item">На головну</Link>
                <button className={`nav-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Всі рекомендації</button>
                <button className={`nav-item ${activeTab === 'inProgress' ? 'active' : ''}`} onClick={() => setActiveTab('inProgress')}>В процесі</button>
                <button className={`nav-item ${activeTab === 'watched' ? 'active' : ''}`} onClick={() => setActiveTab('watched')}>Переглянуто</button>
                <button className={`nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>Цитати</button>
            </nav>

            <div 
                className="cabinet-user-profile" 
                ref={profileRef} 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
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
                        
                        {!isChoosingAvatar ? (
                            <>
                                <button onClick={() => setIsChoosingAvatar(true)}>Змінити аватарку</button>
                                <button className="logout-btn" onClick={logout}>Вийти з акаунту</button>
                            </>
                        ) : (
                            <div className="avatar-selection">
                                <p className="avatar-selection-title">Обери новий стиль:</p>
                                <div className="avatar-grid">
                                    {predefinedAvatars.map((ava, index) => (
                                        <img 
                                            key={index} 
                                            src={ava} 
                                            alt={`Avatar option ${index}`} 
                                            className="avatar-option"
                                            onClick={() => handleAvatarSelect(ava)}
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