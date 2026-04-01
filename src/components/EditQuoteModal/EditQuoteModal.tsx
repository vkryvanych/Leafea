import { useState, useEffect, useRef } from 'react';
import '../AddQuoteModal/AddQuoteModal.css'; 
import '../CabinetCard/CabinetCard.css'; 

interface EditQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newText: string) => void;
    onDelete: () => void;
    initialText: string;
}

function EditQuoteModal({ isOpen, onClose, onSave, onDelete, initialText }: EditQuoteModalProps) {
    const [quoteText, setQuoteText] = useState(initialText);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false); 
    
    const deleteMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setQuoteText(initialText);
        setShowConfirmDelete(false); 
    }, [initialText, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (deleteMenuRef.current && !deleteMenuRef.current.contains(event.target as Node)) {
                setShowConfirmDelete(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const handleSave = () => {
        if (quoteText.trim() === '') return;
        onSave(quoteText);
        onClose();
    };

    return (
        <div className="quote-modal-overlay" onClick={onClose}>
            <div className="quote-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="quote-modal-close" onClick={onClose}>×</button>
                
                <h2 className="quote-modal-title">Редагувати цитату</h2>

                <div className="quote-modal-area">
                    <div className="quote-form-group">
                        <textarea 
                            className="quote-input"
                            placeholder="Введи текст цитати сюди..."
                            value={quoteText}
                            onChange={(e) => setQuoteText(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="quote-modal-actions split-actions">
                    <div style={{ position: 'relative' }} ref={deleteMenuRef}>
                        <button 
                            className="quote-btn-cancel delete-btn" 
                            onClick={() => setShowConfirmDelete(true)} 
                        >
                            Видалити
                        </button>

                        {showConfirmDelete && (
                            <div 
                                className="card-dropdown" 
                                style={{ 
                                    top: 'auto', 
                                    bottom: '100%', 
                                    left: '0', 
                                    transform: 'none',
                                    marginBottom: '10px'
                                }}
                            >
                                <p className="card-dropdown-title">Видалити?</p>
                                <div className="card-dropdown-buttons">
                                    <button className="confirm-btn" onClick={onDelete}>Так</button>
                                    <button className="cancel-btn" onClick={() => setShowConfirmDelete(false)}>Ні</button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="right-actions">
                        <button className="quote-btn-submit" onClick={handleSave}>
                            Зберегти
                        </button>
                        <button className="quote-btn-cancel" onClick={onClose}>
                            Скасувати
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuoteModal;