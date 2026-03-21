import { useEffect, useRef } from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoriesSection.css';
import card_1 from '../../assets/card_1.jpg';
import card_2 from '../../assets/card_2.jpg';
import card_3 from '../../assets/card_3.jpg';

const categoriesData = [
    { 
        id: 1, 
        title: 'Фільми та серіали', 
        image: card_1 
    },
    { 
        id: 2, 
        title: 'Аніме', 
        image: card_2
    },
    { 
        id: 3, 
        title: 'Книги', 
        image: card_3
    }
];

function CategoriesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoSwipeStopped = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !container.firstChild) return;

        let index = 0;

        const stopAutoSwipe = () => {
            autoSwipeStopped.current = true;
            clearInterval(intervalId);
        };

    
        container.addEventListener("touchstart", stopAutoSwipe, { once: true });
        container.addEventListener("mousedown", stopAutoSwipe, { once: true });
        container.addEventListener("wheel", stopAutoSwipe, { once: true });

        const intervalId = setInterval(() => {
            if (autoSwipeStopped.current) return;
            if (container.scrollWidth <= container.clientWidth) return;

            const gap = 20; 
            const cardWidth = (container.firstChild as HTMLElement).offsetWidth + gap;

            index++;
            if (index >= categoriesData.length) index = 0;

            container.scrollTo({
                left: cardWidth * index,
                behavior: "smooth",
            });
        }, 3500);

        return () => {
            clearInterval(intervalId);
            container.removeEventListener("touchstart", stopAutoSwipe);
            container.removeEventListener("mousedown", stopAutoSwipe);
            container.removeEventListener("wheel", stopAutoSwipe);
        };
    }, []);

    return (
        <section className="categories-section">
            <h2 className="categories-title">
                Що можна обрати за допомогою <br/>
                <span className="highlight-text">Leafea</span>?
            </h2>
            
            <div className="categories-grid" ref={containerRef}>
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