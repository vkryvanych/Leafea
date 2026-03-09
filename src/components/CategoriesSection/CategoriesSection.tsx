import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoriesSection.css';
import card_1 from '../../assets/card_1.jpg'
import card_2 from '../../assets/card_2.jpg'
import card_3 from '../../assets/card_3.jpg'
 

const categoriesData = [
    { 
        id: 1, 
        title: 'Фільми та серіали', 
        image: card_1 
    },
    { 
        id: 2, 
        title: 'Аніме', 
        image:  card_2
    },
    { 
        id: 3, 
        title: 'Книги', 
        image: card_3
    }
];

function CategoriesSection() {
    return (
        <section className="categories-section">
            <h2 className="categories-title">
                Що можна обрати за допомогою <br/>
                <span className="highlight-text">Leafea</span>?
            </h2>
            
            <div className="categories-grid">
                {categoriesData.map((category) => (
                    <CategoryCard 
                        key={category.id} 
                        title={category.title} 
                        image={category.image} 
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoriesSection;