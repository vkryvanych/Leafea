import { useState, useRef, useEffect } from 'react';
import '../CabinetCard/CabinetCard.css'; 
import './WatchedCard.css'; 
import iconMovie from '../../assets/movie.png';
import iconSeries from '../../assets/netflix.png';
import iconAnime from '../../assets/anime.png';
import iconBook from '../../assets/book.png';
import anime_def from '../../assets/anime_def.jpg';
import movie_def from '../../assets/movie_def.jpg';
import book_def from '../../assets/book_def.jpg';
import serial_def from '../../assets/serial_def.jpg';

interface WatchedCardProps {
    id: number; 
    title: string;
    image: string;
    category: 'movie' | 'series' | 'anime' | 'book';
    rating?: string;
    review?: string;
    onDelete: (id: number) => void; 
    onUpdateDetails: (id: number, rating: string, review: string) => void; 
    onViewQuotes?: (itemId: number) => void; 
}

function WatchedCard({ 
    id, title, image, category, rating = '', review = '', onDelete, onUpdateDetails, onViewQuotes 
}: WatchedCardProps) {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [showConfirmMenu, setShowConfirmMenu] = useState(false); 
    const [localRating, setLocalRating] = useState(rating);
    const [localReview, setLocalReview] = useState(review);
    const [hoverRating, setHoverRating] = useState(0);

    const menuRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const defaultPosters = {
        movie: movie_def, series: serial_def, anime: anime_def, book: book_def
    };
    const currentImage = image || defaultPosters[category];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowConfirmMenu(false);
                setIsDeleteMode(false);
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

    const handleSaveReview = () => {
        onUpdateDetails(id, localRating, localReview);
    };

    const handleStarClick = (selectedRating: number) => {
        const newRating = selectedRating.toString();
        setLocalRating(newRating);
        onUpdateDetails(id, newRating, localReview);
    };

    return (
        <div className="cabinet-card watched-card">
            <img src={currentImage} alt={title} className="card-poster" onError={(e) => { e.currentTarget.src = defaultPosters[category]; }}/>
            
            <div className="card-content watched-content">
                <div className="watched-header">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-icon-wrapper" ref={menuRef}>
                        <div className={`card-icon-circle ${isDeleteMode ? 'delete-mode' : ''}`} onClick={handleIconClick}>
                            {isDeleteMode ? <span className="delete-cross">×</span> : getCategoryIcon()}
                        </div>
                        {showConfirmMenu && (
                            <div className="card-dropdown watched-dropdown">
                                <p className="card-dropdown-title">Видалити?</p>
                                <div className="card-dropdown-buttons">
                                    <button className="confirm-btn" onClick={() => onDelete(id)}>Так</button>
                                    <button className="cancel-btn" onClick={() => {setShowConfirmMenu(false); setIsDeleteMode(false);}}>Ні</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="watched-body">
                    <div className="input-group rating-group">
                        <label>Оцінка</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <span 
                                    key={star}
                                    className={`star ${star <= (hoverRating || Number(localRating)) ? 'filled' : ''}`}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                            <span className="rating-number-display">
                                {localRating ? `${localRating}/10` : ''}
                            </span>
                        </div>
                    </div>

                    <div className="input-group review-group">
                        <label>Відгук</label>
                        <textarea 
                            className="watched-input review-input" 
                            value={localReview}
                            onChange={(e) => setLocalReview(e.target.value)}
                            onBlur={handleSaveReview}
                        />
                    </div>
                </div>

                <div className="watched-footer">
           
                    <button 
                        className="card-action-btn" 
                        onClick={() => onViewQuotes && onViewQuotes(id)}
                    >
                        Переглянути цитати
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WatchedCard;