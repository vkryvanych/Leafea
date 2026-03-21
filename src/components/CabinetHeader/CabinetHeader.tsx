import { useState, useRef, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
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
    const navigate = useNavigate(); 
    

    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsAddMenuOpen(false);
            }
        };

        if (isAddMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAddMenuOpen]);

    const handleGoToTest = () => {
        setIsAddMenuOpen(false); 
        navigate('/test');       
    };

    const handleOpenModal = () => {
        setIsAddMenuOpen(false); 
        onOpenAddModal();        
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
                        <button onClick={handleOpenModal}>
                            Додати рекомендацію вручну
                        </button>
                        
                        <button onClick={handleGoToTest}>
                            Перейти до тесту
                        </button>
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

            <div className="cabinet-user-profile">
                <img src={card_1} alt="User Avatar" className="cabinet-avatar" />
                <span className="cabinet-username">{userData.name}</span>
            </div>
        </header>
    );
}

export default CabinetHeader;