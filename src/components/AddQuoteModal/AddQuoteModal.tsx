import { useState, useEffect } from 'react';
import './AddQuoteModal.css';

interface AddQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (quoteText: string) => void;
    title: string;
    creator: string;
    itemId: number | null; 
}

function AddQuoteModal({ isOpen, onClose, onSave, title, creator, itemId }: AddQuoteModalProps) {
    const [drafts, setDrafts] = useState<Record<number, string>>({});
    const [quoteText, setQuoteText] = useState('');

    useEffect(() => {
        if (isOpen && itemId !== null) {
            setQuoteText(drafts[itemId] || '');
        }
    }, [isOpen, itemId]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setQuoteText(text);
        if (itemId !== null) {
            setDrafts(prev => ({ ...prev, [itemId]: text }));
        }
    };

    const handleSave = () => {
        if (quoteText.trim() === '') return;
        onSave(quoteText);

        if (itemId !== null) {
            setDrafts(prev => ({ ...prev, [itemId]: '' }));
        }
        setQuoteText('');
        onClose();
    };

    return (
        <div className="quote-modal-overlay" onClick={onClose}>
            <div className="quote-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="quote-modal-close" onClick={onClose}>×</button>
                
                <h2 className="quote-modal-title">Додати цитату</h2>
                
                <div className="quote-modal-area">
                    <div className="quote-context">
                        <span className="quote-title">«{title}»</span>
                        <span className="quote-creator">{creator}</span>
                    </div>

                    <div className="quote-form-group">
                        <textarea 
                            className="quote-input"
                            placeholder="Введи текст цитати сюди..."
                            value={quoteText}
                            onChange={handleChange} 
                            autoFocus
                        />
                    </div>
                </div>

                <div className="quote-modal-actions centered-actions">
                    <button className="quote-btn-submit" onClick={handleSave}>
                        Зберегти
                    </button>
                    <button className="quote-btn-cancel" onClick={onClose}>
                        Скасувати
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddQuoteModal;