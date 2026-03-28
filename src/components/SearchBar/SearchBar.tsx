import './SearchBar.css';
import searchIcon from '../../assets/close.png'; 

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
}

function SearchBar({ searchQuery, setSearchQuery, placeholder = "Що саме шукаємо?" }: SearchBarProps) {
    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <img src={searchIcon} alt="Пошук" className="search-icon" />
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
        </div>
    );
}

export default SearchBar;