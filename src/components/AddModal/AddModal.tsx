import { useState } from 'react';
import type { FormEvent } from 'react'; 
import './AddModal.css';

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newItem: any) => void;
}

function AddModal({ isOpen, onClose, onAdd }: AddModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'movie' | 'series' | 'anime' | 'book'>('movie');

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        const newItem = {
            id: Date.now(),
            title,
            description,
            image: image || 'https://via.placeholder.com/140x200/252F6B/FFFFFF?text=No+Image', 
            category
        };

        onAdd(newItem); 
        onClose();      

        setTitle('');
        setDescription('');
        setImage('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Додати рекомендацію</h2>

                <form onSubmit={handleSubmit} className="modal-form">
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
                        <label>Посилання на картинку (URL)</label>
                        <input 
                            type="url" 
                            placeholder="https://..." 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Короткий опис</label>
                        <textarea 
                            placeholder="Про що це?" 
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
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