import './CabinetCard.css';
import iconMovie from '../../assets/movie.png';
import iconSeries from '../../assets/netflix.png';
import iconAnime from '../../assets/anime.png';
import iconBook from '../../assets/book.png';

interface CabinetCardProps {
    title: string;
    description: string;
    image: string;
    category: 'movie' | 'series' | 'anime' | 'book';
}

function CabinetCard({ title, description, image, category }: CabinetCardProps) {
    
    const getCategoryIcon = () => {
        switch(category) {
            case 'movie': 
                
                return <img src={iconMovie} alt="Фільм" className="category-img-icon" />;
           
            case 'series': 
                return <img src={iconSeries} alt="Серіал" className="category-img-icon" />;
            
            case 'anime': 
                return <img src={iconAnime} alt="Аніме" className="category-img-icon" />;
                
            case 'book': 
                return <img src={iconBook} alt="Книга" className="category-img-icon" />;
                
            default: 
                return null;
        }
    };

    return (
        <div className="cabinet-card">
            <img src={image} alt={title} className="card-poster" />
            
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-desc">{description}</p>
            </div>
            
            <div className="card-actions">
                <div className="card-icon-circle">
                    {getCategoryIcon()}
                </div>
                <button className="card-action-btn">Почати</button>
            </div>
        </div>
    );
}

export default CabinetCard;