import { useState, useRef, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 
import card_1 from '../../assets/card_1.jpg'; 
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
    const [currentAvatar, setCurrentAvatar] = useState(card_1);

    const navigate = useNavigate(); 
    const { logout } = useAuth(); 
    
    const menuRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null); 
    
    
    const predefinedAvatars = [
        card_1
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
        setIsChoosingAvatar(false);
        setIsProfileMenuOpen(false);
    };

    return (
        <header className="cabinet-header">
            
            <div className="cabinet-logo-container" ref={menuRef}>
                <button 
                    className="cabinet-add-btn"
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
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
                title={`Налаштування профілю`}
            >
                <img src={currentAvatar} alt="User Avatar" className="cabinet-avatar" />
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