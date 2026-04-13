import tw_test from '../../assets/tw_test.jpeg'; 
import serial_test from '../../assets/serial_test.png';
import anime1_test from '../../assets/anime1_test.jpeg';
import book_test from '../../assets/book_test.jpg';
import './CategorySelector.css';

interface Props {
    onSelect: (category: string) => void;
}

export default function CategorySelector({ onSelect }: Props) {
    return (
        <div className="test-step-container">
            <h1 className="test-main-title">Яку рекомендацію ти хочеш отримати?</h1>
            <div className="test-category-grid">
                <button className="test-category-card" onClick={() => onSelect('movie')}>
                    <div className="test-category-image-wrapper">
                        <img src={tw_test} alt="Фільми" className="test-category-img" />
                    </div>
                    <span className="test-category-name">Фільми</span>
                </button>
                <button className="test-category-card" onClick={() => onSelect('series')}>
                    <div className="test-category-image-wrapper">
                        <img src={serial_test} alt="Серіали" className="test-category-img" /> 
                    </div>
                    <span className="test-category-name">Серіали</span>
                </button>
                <button className="test-category-card" onClick={() => onSelect('anime')}>
                    <div className="test-category-image-wrapper">
                        <img src={anime1_test} alt="Аніме" className="test-category-img" />
                    </div>
                    <span className="test-category-name">Аніме</span>
                </button>
                <button className="test-category-card" onClick={() => onSelect('book')}>
                    <div className="test-category-image-wrapper">
                        <img src={book_test} alt="Книги" className="test-category-img" />
                    </div>
                    <span className="test-category-name">Книги</span>
                </button>
            </div>
        </div>
    );
}