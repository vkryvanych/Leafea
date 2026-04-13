import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
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
   
    const xPct = useMotionValue(0);
    const yPct = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const springXPct = useSpring(xPct, springConfig);
    const springYPct = useSpring(yPct, springConfig);
    const springMouseX = useSpring(mouseX, springConfig);
    const springMouseY = useSpring(mouseY, springConfig);
    const rotateX = useTransform(springYPct, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(springXPct, [-0.5, 0.5], ["-7deg", "7deg"]);
    const background = useMotionTemplate`radial-gradient(400px circle at ${springMouseX}px ${springMouseY}px, rgba(0, 0, 0, 0.5), transparent 70%)`;

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        xPct.set((e.clientX - rect.left) / rect.width - 0.5);
        yPct.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        xPct.set(0);
        yPct.set(0);
    };

    return (
        <div style={{ perspective: 1200 }}>
            <motion.div 
                className="welcome-banner"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                    rotateX, 
                    rotateY,
                    transformStyle: "preserve-3d" 
                }}
            >
                <motion.div 
                    className="welcome-banner-glare" 
                    style={{ background }} 
                />

                <div className="welcome-banner-content" style={{ transform: "translateZ(40px)" }}>
                    <h1 className="welcome-title">З поверненням, {name}!</h1>
                    <p className="welcome-subtitle">Твоя статистика</p>
                    
                    <div className="stats-container">
                        <div className="stat-item">
                            <div className="stat-circle"><img src={iconMovie} alt="Movies" /></div>
                            <span className="stat-number">{stats.movies}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-circle"><img src={iconSeries} alt="Netflix" /></div>
                            <span className="stat-number">{stats.series}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-circle"><img src={iconAnime} alt="Anime" /></div>
                            <span className="stat-number">{stats.anime}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-circle"><img src={iconBook} alt="Book" /></div>
                            <span className="stat-number">{stats.books}</span>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}

export default UserStatistics;