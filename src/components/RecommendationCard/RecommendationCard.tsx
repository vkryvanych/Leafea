import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { useNavigate } from 'react-router-dom';
import type { RecommendationData } from '../testData/mockRecommendation';
import './RecommendationCard.css';

interface Props {
    data: RecommendationData;
    onRestart: () => void; 
    onAnotherOption: () => void;
    onSave: () => void; 
}

export default function RecommendationCard({ data, onRestart, onAnotherOption, onSave }: Props) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem('myLeafeaCards');
        const currentCards = savedData ? JSON.parse(savedData) : [];
        setIsSaved(currentCards.some((item: any) => item.title === data.title));
    }, [data.title]);

    const handleSaveClick = () => {
        if (isSaved) {
            const savedData = localStorage.getItem('myLeafeaCards');
            const currentCards = savedData ? JSON.parse(savedData) : [];
            const existingCard = currentCards.find((item: any) => item.title === data.title);

            let targetTab = 'all'; 
            if (existingCard) {
                if (existingCard.status === 'inProgress') targetTab = 'inProgress';
                if (existingCard.status === 'watched') targetTab = 'watched';
            }
            navigate('/cabinet', { state: { activeTab: targetTab } });
        } else {
            onSave();
            setIsSaved(true);
        }
    };

    const showPrev = () => {
        setSelectedImageIndex((prev) => 
            prev === null ? null : prev === 0 ? data.galleryImages.length - 1 : prev - 1
        );
    };

    const showNext = () => {
        setSelectedImageIndex((prev) => 
            prev === null ? null : prev === data.galleryImages.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === "Escape") setSelectedImageIndex(null);
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImageIndex, data.galleryImages.length]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={`rec-star ${index < rating ? 'filled' : ''}`}>★</span>
        ));
    };

    return (
        <div className="recommendation-container">
            <h1 className="recommendation-main-title">Ось що ми знайшли для вас!</h1>
            <div className="recommendation-card" style={{ backgroundImage: `url(${data.backgroundImage})` }}>
                <div className="rec-overlay">
                    <div className="rec-left">
                        <div className="rec-content-wrapper">
                            <h2 className="rec-title">{data.title}</h2>
                            <p className="rec-description">{data.description}</p>
                            <div className="rec-bottom-info">
                                <span className="rec-info-label">{data.bottomLeftLabel}</span>
                                <span className="rec-info-text">{data.bottomLeftText}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rec-right">
                        <div className="rec-actions">
                            <button className="text-btn" onClick={onAnotherOption}>Інший варіант</button>
                            <button 
                                className={`save-btn ${isSaved ? 'already-saved' : ''}`} 
                                onClick={handleSaveClick}
                            >
                                {isSaved ? 'У кабінеті' : 'Зберегти'}
                            </button>
                        </div>
                        <div className="rec-details">
                            {data.details.map((detail, index) => (
                                <div className="rec-detail-item" key={index}>
                                    <span className="rec-detail-label">{detail.label}</span>
                                    <span className="rec-detail-value">{detail.value}</span>
                                </div>
                            ))}
                            <div className="rec-detail-item">
                                <span className="rec-detail-label">Середня оцінка</span>
                                <div className="stars-container">{renderStars(data.rating)}</div>
                            </div>
                        </div>
                        <div className="gallery-trigger">
                            <span className="rec-detail-label">{data.galleryTitle}</span>
                            <div 
                                className="thumbnail-container" 
                                onClick={() => setSelectedImageIndex(0)}
                                style={{ backgroundImage: `url(${data.galleryImages[0]})` }}
                            >
                                <div className="play-icon">▶</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="back-btn" onClick={onRestart}>← Назад</button>
            {selectedImageIndex !== null && createPortal(
                <div className="modal" onClick={() => setSelectedImageIndex(null)}>
                    <button className="close" onClick={() => setSelectedImageIndex(null)}>✕</button>
                    <button className="prev" onClick={(e) => { e.stopPropagation(); showPrev(); }}>❮</button>
                    <div className="modal-image-container">
                        <img src={data.galleryImages[selectedImageIndex]} alt="Full view" className="modal-image" onClick={(e) => e.stopPropagation()} />
                    </div>
                    <button className="next" onClick={(e) => { e.stopPropagation(); showNext(); }}>❯</button>
                    <div className="modal-thumbnails" onClick={(e) => e.stopPropagation()}>
                        {data.galleryImages.map((imgUrl, idx) => (
                            <img key={idx} id={`modal-thumb-${idx}`} src={imgUrl} alt={`thumbnail ${idx}`} className={`thumbnail ${idx === selectedImageIndex ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(idx); }} />
                        ))}
                    </div>
                </div>,
                document.body 
            )}
        </div>
    );
}