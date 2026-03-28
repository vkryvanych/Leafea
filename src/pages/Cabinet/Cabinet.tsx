import { useState, useEffect } from 'react'; 
import { useCabinetData } from '../../hooks/useCabinetData';
import CabinetHeader from '../../components/CabinetHeader/CabinetHeader';
import UserStatistics from '../../components/UserStatistics/UserStatistics';
import CabinetCard from '../../components/CabinetCard/CabinetCard';
import InProgressCard from '../../components/InProgressCard/InProgressCard';
import WatchedCard from '../../components/WatchedCard/WatchedCard'; 
import AddModal from '../../components/AddModal/AddModal'; 
import SearchBar from '../../components/SearchBar/SearchBar'; 
import star from '../../assets/star.png';
import emerald from '../../assets/emerald.png'; 
import './Cabinet.css';

function Cabinet() {
    const { userData, loading } = useCabinetData();
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localItems, setLocalItems] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedData = localStorage.getItem('myLeafeaCards');
        if (savedData) {
            setLocalItems(JSON.parse(savedData));
        } else {
            setLocalItems([]);
            localStorage.setItem('myLeafeaCards', JSON.stringify([]));
        }
    }, []); 

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

    if (loading) return <div className="cabinet-loading">Завантаження твого простору...</div>;

    const currentStats = {
        movies: localItems.filter(item => item.category === 'movie').length,
        series: localItems.filter(item => item.category === 'series').length,
        anime: localItems.filter(item => item.category === 'anime').length,
        books: localItems.filter(item => item.category === 'book').length,
    };

    return (
        <div className="cabinet-page">
            <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddNewItem} />
            
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
                                <p>Додай свою першу рекомендацію, щоб почати формувати власний простір!</p>
                            </div> 
                        ) : (
                            <div className="recent-items-section">
                                <h2 className="recent-title"><img src={star} alt="star" className="star-icon" /> Нещодавно додане</h2>
                                <div className="saved-items-list">
                                    {localItems.filter(item => item.status === 'planned').map((item: any) => (
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
                                        startDate={item.startDate} totalPages={item.totalPages} currentPage={item.currentPage || 0}
                                        onDelete={handleDeleteItem} onUpdateProgress={handleUpdateProgress} 
                                        onMarkAsWatched={handleMarkAsWatched} 
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
                                    />
                            ))}
                            {localItems.filter(item => item.status === 'watched').length === 0 && (
                                <div className="placeholder-tab">Ти ще не маєш переглянутого/прочитаного контенту</div>
                            )}
                        </div>
                    </section>
                )}

                {activeTab === 'quotes' && <div className="placeholder-tab">Тут будуть твої улюблені цитати</div>}
            </main>
        </div>
    );
}

export default Cabinet;