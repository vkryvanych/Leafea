import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
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
    const { userData, loading } = useCabinetData();
    const location = useLocation(); 
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localItems, setLocalItems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [selectedItemForQuote, setSelectedItemForQuote] = useState<any>(null);
    const [activeQuoteTab, setActiveQuoteTab] = useState<'all' | 'favorites'>('all');

    const [isEditQuoteModalOpen, setIsEditQuoteModalOpen] = useState(false);
    const [editingQuote, setEditingQuote] = useState<{itemId: number, quoteId: string, text: string} | null>(null);
    const [quoteFilterItemId, setQuoteFilterItemId] = useState<number | null>(null);

    useEffect(() => {
        if (location.state && (location.state as any).activeTab) {
            setActiveTab((location.state as any).activeTab);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        const savedData = localStorage.getItem('myLeafeaCards');
        if (savedData) {
            setLocalItems(JSON.parse(savedData));
        } else {
            setLocalItems([]);
            localStorage.setItem('myLeafeaCards', JSON.stringify([]));
        }
    }, []); 

    useEffect(() => {
        if (activeTab !== 'quotes') {
            setQuoteFilterItemId(null);
        }
    }, [activeTab]);

    const handleAddNewItem = (newItem: any) => {
        const updatedItems = [newItem, ...localItems];
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleDeleteItem = (idToDelete: number) => {
        const updatedItems = localItems.filter(item => item.id !== idToDelete);
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleStartItem = (idToStart: number) => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('uk-UA', options);

        const updatedItems = localItems.map(item => {
            if (item.id === idToStart) {
                return { ...item, status: 'inProgress', startDate: formattedDate };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
        
        setActiveTab('inProgress'); 
    };

    const handleUpdateProgress = (idToUpdate: number, newProgress: number) => {
        const updatedItems = localItems.map(item => {
            if (item.id === idToUpdate) {
                const isFinished = item.category !== 'movie' && item.totalPages > 0 && newProgress >= item.totalPages;
                return { 
                    ...item, 
                    currentPage: newProgress,
                    status: isFinished ? 'watched' : item.status 
                };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleMarkAsWatched = (idToWatch: number) => {
        const updatedItems = localItems.map(item => {
            if (item.id === idToWatch) {
                return { ...item, status: 'watched' };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleUpdateWatchedDetails = (idToUpdate: number, rating: string, review: string) => {
        const updatedItems = localItems.map(item => {
            if (item.id === idToUpdate) {
                return { ...item, rating, review };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleOpenQuoteModal = (id: number) => {
        const item = localItems.find(i => i.id === id);
        if (item) {
            setSelectedItemForQuote(item);
            setIsQuoteModalOpen(true);
        }
    };

    const handleSaveQuote = (quoteText: string) => {
        if (!selectedItemForQuote) return;

        const newQuote = {
            id: Date.now().toString(), 
            text: quoteText,
            isFavorite: false 
        };

        const updatedItems = localItems.map(item => {
            if (item.id === selectedItemForQuote.id) {
                const existingQuotes = item.quotes || [];
                return { ...item, quotes: [newQuote, ...existingQuotes] };
            }
            return item;
        });

        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
        setActiveTab('quotes');
        setActiveQuoteTab('all'); 
    };

    const handleToggleFavoriteQuote = (itemId: number, quoteId: string) => {
        const updatedItems = localItems.map(item => {
            if (item.id === itemId && item.quotes) {
                const updatedQuotes = item.quotes.map((q: any) => 
                    q.id === quoteId ? { ...q, isFavorite: !q.isFavorite } : q
                );
                return { ...item, quotes: updatedQuotes };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleOpenEditQuote = (itemId: number, quoteId: string) => {
        const item = localItems.find(i => i.id === itemId);
        const quote = item?.quotes?.find((q: any) => q.id === quoteId);
        if (quote) {
            setEditingQuote({ itemId, quoteId, text: quote.text });
            setIsEditQuoteModalOpen(true);
        }
    };

    const handleSaveEditedQuote = (newText: string) => {
        if (!editingQuote) return;
        const updatedItems = localItems.map(item => {
            if (item.id === editingQuote.itemId) {
                const updatedQuotes = item.quotes.map((q: any) => 
                    q.id === editingQuote.quoteId ? { ...q, text: newText } : q
                );
                return { ...item, quotes: updatedQuotes };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    const handleDeleteQuote = () => {
        if (!editingQuote) return;
        const updatedItems = localItems.map(item => {
            if (item.id === editingQuote.itemId) {
                const updatedQuotes = item.quotes.filter((q: any) => q.id !== editingQuote.quoteId);
                return { ...item, quotes: updatedQuotes };
            }
            return item;
        });
        setLocalItems(updatedItems);
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
        setIsEditQuoteModalOpen(false);
    };

    const handleViewSpecificQuotes = (itemId: number) => {
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
        .filter(q => quoteFilterItemId ? q.itemId === quoteFilterItemId : true) 
        .filter(q => activeQuoteTab === 'favorites' ? q.isFavorite : true)
        .filter(q => 
            q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.creator.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const filteredItemTitle = quoteFilterItemId 
        ? localItems.find(i => i.id === quoteFilterItemId)?.title 
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
                                        .sort((a, b) => Number(b.id) - Number(a.id))
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
                                .sort((a, b) => Number(b.id) - Number(a.id))
                                .map((item: any) => (
                                    <InProgressCard 
                                        key={item.id} id={item.id} title={item.title} image={item.image}
                                        category={item.category} creator={item.creator} genres={item.genres}
                                        startDate={item.startDate} totalPages={item.totalPages} currentPage={item.currentPage || 0}
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
                                .sort((a, b) => Number(b.id) - Number(a.id))
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