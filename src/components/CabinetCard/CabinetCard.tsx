import { useState, useRef, useEffect } from 'react';
import './CabinetCard.css';
import iconMovie from '../../assets/movie.png';
import iconSeries from '../../assets/netflix.png';
import iconAnime from '../../assets/anime.png';
import iconBook from '../../assets/book.png';
import anime_def from '../../assets/anime_def.jpg';
import movie_def from '../../assets/movie_def.jpg';
import book_def from '../../assets/book_def.jpg';
import serial_def from '../../assets/serial_def.jpg';

interface CabinetCardProps {
    id: number; 
    title: string;
    description: string;
    image: string;
    category: 'movie' | 'series' | 'anime' | 'book';
    onDelete: (id: number) => void; 
}

function CabinetCard({ id, title, description, image, category, onDelete }: CabinetCardProps) {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [showConfirmMenu, setShowConfirmMenu] = useState(false); 
    
    const menuRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const defaultPosters = {
        movie: movie_def,
        series: serial_def,
        anime: anime_def,
        book: book_def
    };

    const currentImage = image || defaultPosters[category];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowConfirmMenu(false);
                setIsDeleteMode(false);
            }
        };

        if (showConfirmMenu || isDeleteMode) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [showConfirmMenu, isDeleteMode]);

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
            timerRef.current = setTimeout(() => {
                setIsDeleteMode(false);
            }, 3000);
        } else {
            if (timerRef.current) clearTimeout(timerRef.current); 
            setShowConfirmMenu(true); 
        }
    };

    const handleConfirmDelete = () => {
        onDelete(id);
    };

    const handleCancelDelete = () => {
        setShowConfirmMenu(false);
        setIsDeleteMode(false);
    };

    return (
        <div className="cabinet-card">
            <img 
                src={currentImage} 
                alt={title} 
                className="card-poster" 
                onError={(e) => {
                    e.currentTarget.src = defaultPosters[category];
                }}
            />
            
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-desc">{description}</p>
            </div>
            
            <div className="card-actions">
                <div className="card-icon-wrapper" ref={menuRef}>
                    <div 
                        className={`card-icon-circle ${isDeleteMode ? 'delete-mode' : ''}`} 
                        onClick={handleIconClick}
                        title={isDeleteMode ? "Видалити назавжди" : "Натисни, щоб видалити"}
                    >
                        {isDeleteMode ? (
                            <span className="delete-cross">×</span>
                        ) : (
                            getCategoryIcon()
                        )}
                    </div>

                    {showConfirmMenu && (
                        <div className="card-dropdown">
                            <p className="card-dropdown-title">Видалити?</p>
                            <div className="card-dropdown-buttons">
                                <button className="confirm-btn" onClick={handleConfirmDelete}>Так</button>
                                <button className="cancel-btn" onClick={handleCancelDelete}>Ні</button>
                            </div>
                        </div>
                    )}

                </div>
                <button className="card-action-btn">Почати</button>
            </div>
        </div>
    );
}

export default CabinetCard;