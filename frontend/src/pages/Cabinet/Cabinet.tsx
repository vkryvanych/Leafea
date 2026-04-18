import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import { useCabinetData } from '../../hooks/useCabinetData';
import CabinetHeader from '../../components/CabinetHeader/CabinetHeader';
import UserStatistics from '../../components/UserStatistics/UserStatistics';
import CabinetCard from '../../components/CabinetCard/CabinetCard';
import InProgressCard from '../../components/InProgressCard/InProgressCard';
import WatchedCard from '../../components/WatchedCard/WatchedCard'; 
import AddModal from '../../components/AddModal/AddModal'; 
import AddQuoteModal from '../../components/AddQuoteModal/AddQuoteModal'; 
import EditQuoteModal from '../../components/EditQuoteModal/EditQuoteModal'; 
import QuoteCard from '../../components/QuoteCard/QuoteCard'; 
import SearchBar from '../../components/SearchBar/SearchBar'; 
import star from '../../assets/star.png';
import emerald from '../../assets/emerald.png'; 
import './Cabinet.css';

function Cabinet() {
    const { userData, loading, localItems, setLocalItems } = useCabinetData();
    const location = useLocation(); 
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [selectedItemForQuote, setSelectedItemForQuote] = useState<any>(null);
    const [activeQuoteTab, setActiveQuoteTab] = useState<'all' | 'favorites'>('all');

    const [isEditQuoteModalOpen, setIsEditQuoteModalOpen] = useState(false);
    const [editingQuote, setEditingQuote] = useState<{itemId: string | number, quoteId: string, text: string} | null>(null);
    const [quoteFilterItemId, setQuoteFilterItemId] = useState<string | number | null>(null);

    const API_URL = 'http://localhost:8080/api/cabinet';
    const getConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    useEffect(() => {
        if (location.state && (location.state as any).activeTab) {
            setActiveTab((location.state as any).activeTab);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        if (activeTab !== 'quotes') {
            setQuoteFilterItemId(null);
        }
    }, [activeTab]);

    const handleAddNewItem = async (newItem: any) => {
        try {
            delete newItem.id; 
            const response = await axios.post(API_URL, newItem, getConfig());
            setLocalItems([response.data, ...localItems]);
        } catch (error) {
            console.error("Помилка при створенні:", error);
        }
    };

    const handleDeleteItem = async (idToDelete: string | number) => {
        try {
            await axios.delete(`${API_URL}/${idToDelete}`, getConfig());
            setLocalItems(localItems.filter(item => item.id !== idToDelete));
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };

    const handleStartItem = async (idToStart: string | number) => {
        const itemToUpdate = localItems.find(item => item.id === idToStart);
        if (!itemToUpdate) return;

        const formattedDate = new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
        const updatedItem = { ...itemToUpdate, status: 'inProgress', startDate: formattedDate };

        try {
            const response = await axios.put(`${API_URL}/${idToStart}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => item.id === idToStart ? response.data : item));
            setActiveTab('inProgress'); 
        } catch (error) {
            console.error("Помилка при оновленні:", error);
        }
    };

    const handleUpdateProgress = async (idToUpdate: string | number, newProgress: number) => {
        const itemToUpdate = localItems.find(item => item.id === idToUpdate);
        if (!itemToUpdate) return;

        const isFinished = itemToUpdate.category !== 'movie' && itemToUpdate.totalAmount > 0 && newProgress >= itemToUpdate.totalAmount;
        const updatedItem = { 
            ...itemToUpdate, 
            currentProgress: newProgress,
            status: isFinished ? 'watched' : itemToUpdate.status 
        };

        try {
            const response = await axios.put(`${API_URL}/${idToUpdate}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => item.id === idToUpdate ? response.data : item));
        } catch (error) {
            console.error("Помилка оновлення прогресу:", error);
        }
    };

    const handleMarkAsWatched = async (idToWatch: string | number) => {
        const itemToUpdate = localItems.find(item => item.id === idToWatch);
        if (!itemToUpdate) return;

        const updatedItem = { ...itemToUpdate, status: 'watched' };
        try {
            const response = await axios.put(`${API_URL}/${idToWatch}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => item.id === idToWatch ? response.data : item));
        } catch (error) {
            console.error("Помилка при оновленні статусу:", error);
        }
    };

    const handleUpdateWatchedDetails = async (idToUpdate: string | number, rating: string, review: string) => {
        const itemToUpdate = localItems.find(item => item.id === idToUpdate);
        if (!itemToUpdate) return;

        const updatedItem = { ...itemToUpdate, rating, review };
        try {
            const response = await axios.put(`${API_URL}/${idToUpdate}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => item.id === idToUpdate ? response.data : item));
        } catch (error) {
            console.error("Помилка при збереженні відгуку:", error);
        }
    };

    const handleOpenQuoteModal = (id: string | number) => {
        const item = localItems.find(i => i.id === id);
        if (item) {
            setSelectedItemForQuote(item);
            setIsQuoteModalOpen(true);
        }
    };

    const handleSaveQuote = async (quoteText: string) => {
        if (!selectedItemForQuote) return;

        const newQuote = {
            id: Date.now().toString(), 
            text: quoteText,
            isFavorite: false 
        };

        const existingQuotes = selectedItemForQuote.quotes || [];
        const updatedItem = { ...selectedItemForQuote, quotes: [newQuote, ...existingQuotes] };

        try {
            const response = await axios.put(`${API_URL}/${selectedItemForQuote.id}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => item.id === selectedItemForQuote.id ? response.data : item));
            setActiveTab('quotes');
            setActiveQuoteTab('all'); 
        } catch (error) {
            console.error("Помилка збереження цитати:", error);
        }
    };

    const handleToggleFavoriteQuote = async (itemId: string | number, quoteId: string) => {
        const itemToUpdate = localItems.find(item => String(item.id) === String(itemId));
        if (!itemToUpdate) return;

        const updatedQuotes = (itemToUpdate.quotes || []).map((q: any) => 
            String(q.id) === String(quoteId) ? { ...q, isFavorite: !q.isFavorite } : q
        );
        const updatedItem = { ...itemToUpdate, quotes: updatedQuotes };

        try {
            const response = await axios.put(`${API_URL}/${itemId}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => String(item.id) === String(itemId) ? response.data : item));
        } catch (error) {
            console.error("Помилка оновлення цитати:", error);
        }
    };

    const handleOpenEditQuote = (itemId: string | number, quoteId: string) => {
        const item = localItems.find(i => String(i.id) === String(itemId));
        const quote = item?.quotes?.find((q: any) => String(q.id) === String(quoteId));
        if (quote) {
            setEditingQuote({ itemId, quoteId, text: quote.text });
            setIsEditQuoteModalOpen(true);
        }
    };

    const handleSaveEditedQuote = async (newText: string) => {
        if (!editingQuote) return;
      
        const itemToUpdate = localItems.find(item => String(item.id) === String(editingQuote.itemId));
        if (!itemToUpdate) return;

        const updatedQuotes = itemToUpdate.quotes.map((q: any) => 
            String(q.id) === String(editingQuote.quoteId) ? { ...q, text: newText } : q
        );
        const updatedItem = { ...itemToUpdate, quotes: updatedQuotes };

        try {
            const response = await axios.put(`${API_URL}/${editingQuote.itemId}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => String(item.id) === String(editingQuote.itemId) ? response.data : item));
            setIsEditQuoteModalOpen(false);
        } catch (error) {
            console.error("Помилка редагування цитати:", error);
        }
    };

    const handleDeleteQuote = async () => {
        if (!editingQuote) return;
        
        const itemToUpdate = localItems.find(item => String(item.id) === String(editingQuote.itemId));
        if (!itemToUpdate) return;

        const updatedQuotes = itemToUpdate.quotes.filter((q: any) => String(q.id) !== String(editingQuote.quoteId));
        const updatedItem = { ...itemToUpdate, quotes: updatedQuotes };

        try {
            const response = await axios.put(`${API_URL}/${editingQuote.itemId}`, updatedItem, getConfig());
            setLocalItems(localItems.map(item => String(item.id) === String(editingQuote.itemId) ? response.data : item));
            setIsEditQuoteModalOpen(false);
        } catch (error) {
            console.error("Помилка видалення цитати:", error);
        }
    };

    const handleViewSpecificQuotes = (itemId: string | number) => {
        setQuoteFilterItemId(itemId); 
        setActiveQuoteTab('all');     
        setSearchQuery('');          
        setActiveTab('quotes');    
    };

    if (loading) return <div className="cabinet-loading">Завантаження твого простору...</div>;

    const currentStats = {
        movies: localItems.filter(item => item.category === 'movie').length,
        series: localItems.filter(item => item.category === 'series').length,
        anime: localItems.filter(item => item.category === 'anime').length,
        books: localItems.filter(item => item.category === 'book').length,
    };

    const allQuotes = localItems.flatMap(item => 
        (item.quotes || []).map((q: any) => ({
            ...q,
            itemId: item.id,
            title: item.title,
            creator: item.creator || 'Невідомо'
        }))
    ).sort((a, b) => Number(b.id) - Number(a.id)); 

    const displayedQuotes = allQuotes
        .filter(q => quoteFilterItemId ? String(q.itemId) === String(quoteFilterItemId) : true) 
        .filter(q => activeQuoteTab === 'favorites' ? q.isFavorite : true)
        .filter(q => 
            q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.creator.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const filteredItemTitle = quoteFilterItemId 
        ? localItems.find(i => String(i.id) === String(quoteFilterItemId))?.title 
        : null;

    return (
        <div className="cabinet-page">
            <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddNewItem} />
            
            <AddQuoteModal 
                isOpen={isQuoteModalOpen} 
                onClose={() => {
                    setIsQuoteModalOpen(false);
                    setSelectedItemForQuote(null);
                }} 
                onSave={handleSaveQuote} 
                title={selectedItemForQuote?.title || ''} 
                creator={selectedItemForQuote?.creator || ''}
                itemId={selectedItemForQuote?.id || null} 
            />
            
            <EditQuoteModal 
                isOpen={isEditQuoteModalOpen}
                onClose={() => setIsEditQuoteModalOpen(false)}
                onSave={handleSaveEditedQuote}
                onDelete={handleDeleteQuote}
                initialText={editingQuote?.text || ''}
            />
            
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <CabinetHeader 
                userData={userData} activeTab={activeTab} setActiveTab={setActiveTab} onOpenAddModal={() => setIsModalOpen(true)} 
            />

            <main className="cabinet-content">
                {activeTab === 'all' && (
                    <section className="tab-main">
                        <UserStatistics name={userData.name} stats={currentStats} />
                        {localItems.filter(item => item.status === 'planned').length === 0 ? (
                            <div className="empty-cabinet-state">
                                <h3 className="empty-title">Тут поки порожньо! <img src={emerald} alt="emerald" className="emerald-icon" /></h3>
                                <p>Додай свою першу рекомендацію, щоб почати формувати власний простір</p>
                            </div> 
                        ) : (
                            <div className="recent-items-section">
                                <h2 className="recent-title"><img src={star} alt="star" className="star-icon" /> Нещодавно додане</h2>
                                <div className="saved-items-list">
                                    {localItems
                                        .filter(item => item.status === 'planned')
                                        .map((item: any) => (
                                        <CabinetCard 
                                            key={item.id} id={item.id} title={item.title} description={item.description || item.genres || 'Немає опису'} 
                                            image={item.image} category={item.category} onDelete={handleDeleteItem} onStart={handleStartItem} 
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {activeTab === 'inProgress' && (
                    <section className="tab-main">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <div className="saved-items-list">
                            {localItems
                                .filter(item => item.status === 'inProgress')
                                .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item: any) => (
                                    <InProgressCard 
                                        key={item.id} id={item.id} title={item.title} image={item.image}
                                        category={item.category} creator={item.creator} genres={item.genres}
                                        startDate={item.startDate} totalAmount={item.totalAmount} currentProgress={item.currentProgress || 0}
                                        onDelete={handleDeleteItem} onUpdateProgress={handleUpdateProgress} 
                                        onMarkAsWatched={handleMarkAsWatched} 
                                        onOpenAddQuote={handleOpenQuoteModal} 
                                    />
                            ))}
                            {localItems.filter(item => item.status === 'inProgress').length === 0 && (
                                <div className="placeholder-tab">У тебе поки немає рекомендацій "В процесі"</div>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'watched' && (
                    <section className="tab-main">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <div className="saved-items-list">
                            {localItems
                                .filter(item => item.status === 'watched')
                                .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item: any) => (
                                    <WatchedCard 
                                        key={item.id} id={item.id} title={item.title} image={item.image}
                                        category={item.category} rating={item.rating || ''} review={item.review || ''}
                                        onDelete={handleDeleteItem} onUpdateDetails={handleUpdateWatchedDetails} 
                                        onViewQuotes={handleViewSpecificQuotes} 
                                    />
                            ))}
                            {localItems.filter(item => item.status === 'watched').length === 0 && (
                                <div className="placeholder-tab">Ти ще не маєш переглянутого/прочитаного контенту</div>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'quotes' && (
                    <section className="tab-main">
                        {quoteFilterItemId && (
                            <div className="quote-filter-container">
                                <div className="quote-filter-pill">
                                    <span className="quote-filter-text">
                                        Показано цитати з: <strong className="quote-filter-title">«{filteredItemTitle}»</strong>
                                    </span>
                                    <button 
                                        className="quote-filter-close"
                                        onClick={() => setQuoteFilterItemId(null)}
                                        title="Скинути фільтр"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                        <div className="quote-subtabs">
                            <span 
                                className={`quote-subtab-btn ${activeQuoteTab === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveQuoteTab('all')}
                            >
                                Усі цитати
                            </span>
                            <span className="quote-subtab-divider">|</span>
                            <span 
                                className={`quote-subtab-btn ${activeQuoteTab === 'favorites' ? 'active' : ''}`}
                                onClick={() => setActiveQuoteTab('favorites')}
                            >
                                Улюблені
                            </span>
                        </div>

                        <div className="quotes-container">
                            {displayedQuotes.length > 0 ? (
                                displayedQuotes.map(quote => (
                                    <QuoteCard 
                                        key={quote.id}
                                        id={quote.id}
                                        itemId={quote.itemId}
                                        text={quote.text}
                                        title={quote.title}
                                        creator={quote.creator}
                                        isFavorite={quote.isFavorite}
                                        onToggleFavorite={handleToggleFavoriteQuote}
                                        onEditQuote={handleOpenEditQuote} 
                                    />
                                ))
                            ) : (
                                <div className="placeholder-tab">
                                    {searchQuery 
                                        ? `За запитом "${searchQuery}" цитат не знайдено.`
                                        : quoteFilterItemId
                                            ? `У творі «${filteredItemTitle}» ще немає цитат.`
                                            : activeQuoteTab === 'favorites' 
                                                ? "У тебе поки немає улюблених цитат. Натисни на сердечко біля будь-якої цитати!" 
                                                : "Ти ще не додав жодної цитати."}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Cabinet;