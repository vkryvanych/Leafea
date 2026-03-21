import { useState, useEffect } from 'react'; 
import { useCabinetData } from '../../hooks/useCabinetData';
import CabinetHeader from '../../components/CabinetHeader/CabinetHeader';
import UserStatistics from '../../components/UserStatistics/UserStatistics';
import CabinetCard from '../../components/CabinetCard/CabinetCard';
import AddModal from '../../components/AddModal/AddModal'; 
import star from '../../assets/star.png';
import './Cabinet.css';

function Cabinet() {
    const { userData, loading } = useCabinetData();
    const [activeTab, setActiveTab] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localItems, setLocalItems] = useState<any[]>([]);

    useEffect(() => {
        const savedData = localStorage.getItem('myLeafeaCards');
        
        if (savedData) {
            setLocalItems(JSON.parse(savedData));
        } else if (userData?.savedItems) {
           
            setLocalItems(userData.savedItems);
            localStorage.setItem('myLeafeaCards', JSON.stringify(userData.savedItems));
        }
    }, [userData]); 

    const handleAddNewItem = (newItem: any) => {
        const updatedItems = [newItem, ...localItems];
        setLocalItems(updatedItems);
        
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedItems));
    };

    if (loading) {
        return <div className="cabinet-loading">Завантаження твого простору...</div>;
    }

    return (
        <div className="cabinet-page">
            <AddModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAdd={handleAddNewItem} 
            />
            
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <CabinetHeader 
                userData={userData} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onOpenAddModal={() => setIsModalOpen(true)} 
            />

            <main className="cabinet-content">
                {activeTab === 'all' && (
                    <section className="tab-main">
                        <UserStatistics name={userData.name} stats={userData.stats} />
                        <div className="recent-items-section">
                            <h2 className="recent-title">
                                <img src={star} alt="star" className="star-icon" /> 
                                Нещодавно додане
                            </h2>
                            <div className="saved-items-list">
                                {localItems.map((item: any) => (
                                    <CabinetCard 
                                        key={item.id}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        category={item.category}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                {activeTab === 'inProgress' && <div className="placeholder-tab">Тут будуть картки "В процесі"</div>}
                {activeTab === 'watched' && <div className="placeholder-tab">Тут будуть картки "Переглянуто"</div>}
                {activeTab === 'quotes' && <div className="placeholder-tab">Тут будуть твої улюблені цитати</div>}
            </main>
        </div>
    );
}

export default Cabinet;