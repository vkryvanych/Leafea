import './QuoteCard.css';

interface QuoteCardProps {
    id: string;
    itemId: number;
    text: string;
    title: string;
    creator: string;
    isFavorite: boolean;
    onToggleFavorite: (itemId: number, quoteId: string) => void;
    onEditQuote: (itemId: number, quoteId: string) => void; 
}

function QuoteCard({ id, itemId, text, title, creator, isFavorite, onToggleFavorite, onEditQuote }: QuoteCardProps) {
    return (
        <div className="quote-card">
            <div className="quote-card-body">
                <p 
                    className="quote-text editable-text" 
                    onClick={() => onEditQuote(itemId, id)}
                    title="Натисніть, щоб редагувати"
                >
                    “{text}”
                </p>
                <div 
                    className={`heart-icon-wrapper ${isFavorite ? 'favorite' : ''}`}
                    onClick={() => onToggleFavorite(itemId, id)}
                >
                    
                    <svg viewBox="0 0 24 24" className="heart-svg">
                        <path d="M 12 5.5 C 9 -1 1 2 1 8 C 1 14 12 21 12 21 C 12 21 23 14 23 8 C 23 2 15 -1 12 5.5 Z"/>
                    </svg>
                </div>
            </div>
            <div className="quote-card-footer">
                <span className="quote-author">{creator}, "{title}"</span>
            </div>
        </div>
    );
}

export default QuoteCard;