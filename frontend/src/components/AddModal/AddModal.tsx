import React, { useState } from 'react';
import './AddModal.css';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newItem: any) => void;
}

function AddModal({ isOpen, onClose, onAdd }: AddModalProps) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'movie' | 'series' | 'anime' | 'book'>('movie');
    
    const [creator, setCreator] = useState(''); 
    const [selectedGenre, setSelectedGenre] = useState(''); 
    const [totalPages, setTotalPages] = useState(''); 

    const availableGenres = [
        "Екшн", "Комедія", "Драма", "Фантастика", "Романтика", 
        "Психологія", "Трилер", "Детектив", "Фентезі", "Пригоди", "Жахи", "Повсякденність"
    ];

    if (!isOpen) return null;

    const toggleGenre = (genre: string) => {
        if (selectedGenre === genre) {
            setSelectedGenre('');
        } else {
            setSelectedGenre(genre);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const newItem = {
            id: Date.now(),
            title,
            image: image || 'https://via.placeholder.com/140x200/252F6B/FFFFFF?text=No+Image', 
            category,
            creator,
            genres: selectedGenre, 
            status: 'planned', 
            
            ...(category !== 'movie' ? { totalPages: Number(totalPages) || 0, currentPage: 0 } : {})
        };

        onAdd(newItem); 
        onClose();      

        setTitle('');
        setImage('');
        setCreator('');
        setSelectedGenre(''); 
        setTotalPages('');
        setCategory('movie');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Додати рекомендацію</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    
                    <div className={category === 'movie' ? "form-group-wrapper" : "form-scroll-area"}>
                        
                        <div className="form-group">
                            <label>Тип контенту</label>
                            <div className="category-selector">
                                <button type="button" className={`cat-btn ${category === 'movie' ? 'active' : ''}`} onClick={() => setCategory('movie')}>Фільм</button>
                                <button type="button" className={`cat-btn ${category === 'series' ? 'active' : ''}`} onClick={() => setCategory('series')}>Серіал</button>
                                <button type="button" className={`cat-btn ${category === 'anime' ? 'active' : ''}`} onClick={() => setCategory('anime')}>Аніме</button>
                                <button type="button" className={`cat-btn ${category === 'book' ? 'active' : ''}`} onClick={() => setCategory('book')}>Книга</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Назва</label>
                            <input 
                                type="text" 
                                placeholder="Наприклад: Грозовий перевал" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required 
                                maxLength={30} 
                            />
                        </div>

                        <div className="form-group">
                            <label>{category === 'book' ? 'Автор' : category === 'anime' ? 'Студія' : 'Режисер'}</label>
                            <input 
                                type="text" 
                                placeholder={category === 'book' ? "Наприклад: Емілі Бронте" : category === 'anime' ? "Наприклад: MAPPA" : "Наприклад: Крістофер Нолан"} 
                                value={creator}
                                onChange={(e) => setCreator(e.target.value)}
                                required
                                maxLength={25} 
                            />
                        </div>

                        <div className="form-group">
                            <label>Жанри</label>
                            <div className="genres-scroll-container">
                                {availableGenres.map(genre => (
                                    <button 
                                        key={genre}
                                        type="button" 
                                        className={`genre-chip ${selectedGenre === genre ? 'active' : ''}`}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {category !== 'movie' && (
                            <div className="form-group">
                                <label>{category === 'book' ? 'Кількість сторінок' : 'Кількість серій'}</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    placeholder={category === 'book' ? "Наприклад: 350" : "Наприклад: 24"} 
                                    value={totalPages}
                                    onChange={(e) => setTotalPages(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Посилання на картинку (URL)</label>
                            <input 
                                type="url" 
                                placeholder="https://..." 
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                    </div> 
                    
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Скасувати</button>
                        <button type="submit" className="btn-submit">Додати</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddModal;