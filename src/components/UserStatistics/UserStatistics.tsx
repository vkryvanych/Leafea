import './UserStatistics.css';
import iconMovie from '../../assets/movie.png';
import iconSeries from '../../assets/netflix.png';
import iconAnime from '../../assets/anime.png';
import iconBook from '../../assets/book.png';


interface UserStatisticsProps {
    name: string;
    stats: {
        movies: number;
        series: number;
        anime: number;
        books: number;
    }
}

function UserStatistics({ name, stats }: UserStatisticsProps) {
    return (
        <div className="welcome-banner">
            <h1 className="welcome-title">З поверненням, {name}!</h1>
            <p className="welcome-subtitle">Твоя статистика</p>
            
            <div className="stats-container">
                {/* Картка: Фільми */}
                <div className="stat-item">
                    <div className="stat-circle">
                        <img src={iconMovie} alt="Movies" /> 
                    </div>
                    <span className="stat-number">{stats.movies}</span>
                </div>

                {/* Картка: Серіали */}
                <div className="stat-item">
                    <div className="stat-circle">
                        <img src={iconSeries} alt="Netflix" /> 
                    </div>
                    <span className="stat-number">{stats.series}</span>
                </div>

                {/* Картка: Аніме */}
                <div className="stat-item">
                    <div className="stat-circle">
                        <img src={iconAnime} alt="Anime" /> 
                    </div>
                    <span className="stat-number">{stats.anime}</span>
                </div>

                {/* Картка: Книги */}
                <div className="stat-item">
                    <div className="stat-circle">
                        <img src={iconBook} alt="Book" /> 
                    </div>
                    <span className="stat-number">{stats.books}</span>
                </div>
            </div>
        </div>
    );
}

export default UserStatistics;