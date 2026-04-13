import { useState, useRef, useEffect } from 'react';
import '../CabinetCard/CabinetCard.css'; 
import './InProgressCard.css'; 
import iconMovie from '../../assets/movie.png';
import iconSeries from '../../assets/netflix.png';
import iconAnime from '../../assets/anime.png';
import iconBook from '../../assets/book.png';
import anime_def from '../../assets/anime_def.jpg';
import movie_def from '../../assets/movie_def.jpg';
import book_def from '../../assets/book_def.jpg';
import serial_def from '../../assets/serial_def.jpg';

interface InProgressCardProps {
    id: number; 
    title: string;
    image: string;
    category: 'movie' | 'series' | 'anime' | 'book';
    creator?: string; 
    genres?: string;
    startDate?: string;
    totalPages?: number;
    currentPage?: number;
    onDelete: (id: number) => void; 
    onUpdateProgress?: (id: number, newProgress: number) => void; 
    onMarkAsWatched?: (id: number) => void; 
    onOpenAddQuote?: (id: number) => void; 
}

function InProgressCard({ 
    id, title, image, category, creator, genres, startDate, 
    totalPages = 0, currentPage = 0, onDelete, onUpdateProgress, onMarkAsWatched, onOpenAddQuote 
}: InProgressCardProps) {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [showConfirmMenu, setShowConfirmMenu] = useState(false); 
    
    const [showProgressMenu, setShowProgressMenu] = useState(false);
    const [tempProgress, setTempProgress] = useState<number | string>(currentPage);

    const menuRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressMenuRef = useRef<HTMLDivElement>(null);

    const defaultPosters = {
        movie: movie_def,
        series: serial_def,
        anime: anime_def,
        book: book_def
    };
    const currentImage = image || defaultPosters[category];

    const progressPercent = totalPages > 0 ? Math.round((currentPage / totalPages) * 100) : 0;
    const showProgress = category !== 'movie'; 

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowConfirmMenu(false);
                setIsDeleteMode(false);
            }
            
            if (progressMenuRef.current && !progressMenuRef.current.contains(event.target as Node)) {
               setShowProgressMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); 
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, []);

    const getCategoryIcon = () => {
        switch(category) {
            case 'movie': return <img src={iconMovie} alt="Фільм" className="category-img-icon" />;
            case 'series': return <img src={iconSeries} alt="Серіал" className="category-img-icon" />;
            case 'anime': return <img src={iconAnime} alt="Аніме" className="category-img-icon" />;
            case 'book': return <img src={iconBook} alt="Книга" className="category-img-icon" />;
            default: return null;
        }
    };

    const handleIconClick = () => {
        if (!isDeleteMode) {
            setIsDeleteMode(true);
            timerRef.current = setTimeout(() => setIsDeleteMode(false), 3000);
        } else {
            if (timerRef.current) clearTimeout(timerRef.current); 
            setShowConfirmMenu(true); 
        }
    };

    return (
        <div className="cabinet-card" style={{ position: 'relative', zIndex: showProgressMenu || showConfirmMenu ? 100 : 1 }}>
            <img src={currentImage} alt={title} className="card-poster" onError={(e) => { e.currentTarget.src = defaultPosters[category]; }}/>
            
            <div className="card-content in-progress-content">
                <div className="info-column">
                    <h2 className="card-title">{title}</h2>
                    
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">{category === 'book' ? 'Автор' : category === 'anime' ? 'Студія' : 'Режисер'}</span>
                            <span className="detail-value">{creator || 'Невідомо'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Жанр</span>
                            <span className="detail-value">{genres || 'Невідомо'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Початок</span>
                            <span className="detail-value">{startDate || 'Нещодавно'}</span>
                        </div>
                    </div>
                </div>

                <div className="action-column">
                    <div className="card-icon-wrapper" ref={menuRef}>
                        <div className={`card-icon-circle ${isDeleteMode ? 'delete-mode' : ''}`} onClick={handleIconClick}>
                            {isDeleteMode ? <span className="delete-cross">×</span> : getCategoryIcon()}
                        </div>
                        {showConfirmMenu && (
                            <div className="card-dropdown">
                                <p className="card-dropdown-title">Видалити?</p>
                                <div className="card-dropdown-buttons">
                                    <button className="confirm-btn" onClick={() => onDelete(id)}>Так</button>
                                    <button className="cancel-btn" onClick={() => {setShowConfirmMenu(false); setIsDeleteMode(false);}}>Ні</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {showProgress && (
                        <div className="progress-section">
                            <div className="progress-header">
                                <span className="progress-label">{category === 'book' ? 'Кількість сторінок' : 'Серії'}</span>
                                <span className="progress-numbers">{currentPage}/{totalPages}</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                            <div className="progress-percent">{progressPercent}%</div>
                        </div>
                    )}

                    <div className="in-progress-buttons">
                        <button 
                            className="card-action-btn"
                            onClick={() => onOpenAddQuote && onOpenAddQuote(id)}
                        >
                            Додати цитату
                        </button>
                        
                        <div className="progress-menu-wrapper" ref={progressMenuRef}>
                            <button 
                                className="card-action-btn"
                                onClick={() => {
                                    if (category === 'movie') {
                                        if (onMarkAsWatched) onMarkAsWatched(id);
                                    } else {
                                        setTempProgress(currentPage);
                                        setShowProgressMenu(!showProgressMenu);
                                    }
                                }}
                            >
                                {category === 'movie' ? 'Переглянуто' : 'Оновити прогрес'}
                            </button>

                            {showProgressMenu && (
                                <div 
                                    className="card-dropdown progress-menu" 
                                    onClick={(e) => e.stopPropagation()} 
                                >
                                    <p className="progress-menu-title">Введи прогрес:</p>
                                    <input 
                                        type="number" 
                                        className="progress-input"
                                        value={tempProgress}
                                        min="0"
                                        max={totalPages}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '') {
                                                setTempProgress('');
                                                return;
                                            }
                                            let num = parseInt(val, 10);
                                            if (totalPages && totalPages > 0 && num > totalPages) {
                                                num = totalPages;
                                            }
                                            if (num < 0) num = 0;
                                            
                                            setTempProgress(num);
                                        }}
                                    />
                                    <div className="progress-buttons-container">
                                        <button 
                                            className="confirm-btn progress-btn-confirm" 
                                            onClick={() => {
                                                if (onUpdateProgress) onUpdateProgress(id, Number(tempProgress) || 0);
                                                setShowProgressMenu(false);
                                            }}
                                        >
                                            Зберегти
                                        </button>
                                        <button 
                                            className="cancel-btn" 
                                            onClick={() => setShowProgressMenu(false)}
                                        >
                                            Скасувати
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default InProgressCard;