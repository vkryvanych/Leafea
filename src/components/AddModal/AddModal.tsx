import React, { useState, useEffect } from 'react';
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
    const [genres, setGenres] = useState(''); 
    const [totalPages, setTotalPages] = useState(''); 

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; 
        }
        return () => { document.body.style.overflow = ''; }; 
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('uk-UA', options) + ' року';

        const newItem = {
            id: Date.now(),
            title,
            image: image || 'https://via.placeholder.com/140x200/252F6B/FFFFFF?text=No+Image', 
            category,
            creator,
            genres,
            startDate: formattedDate,
            status: 'inProgress', 
            
            ...(category === 'book' ? { totalPages: Number(totalPages) || 0, currentPage: 0 } : {})
        };

        onAdd(newItem); 
        onClose();      

        setTitle('');
        setImage('');
        setCreator('');
        setGenres('');
        setTotalPages('');
        setCategory('movie');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Додати рекомендацію</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-scroll-area">
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
                            />
                        </div>

                        <div className="form-group">
                            <label>{category === 'book' ? 'Автор' : 'Режисер'}</label>
                            <input 
                                type="text" 
                                placeholder={category === 'book' ? "Наприклад: Емілі Бронте" : "Наприклад: Крістофер Нолан"} 
                                value={creator}
                                onChange={(e) => setCreator(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Жанри (через кому)</label>
                            <input 
                                type="text" 
                                placeholder="Наприклад: Драма, Психологія" 
                                value={genres}
                                onChange={(e) => setGenres(e.target.value)}
                                required
                            />
                        </div>

                        {category === 'book' && (
                            <div className="form-group">
                                <label>Кількість сторінок</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    placeholder="Наприклад: 350" 
                                    value={totalPages}
                                    onChange={(e) => setTotalPages(e.target.value)}
                                    required={category === 'book'}
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