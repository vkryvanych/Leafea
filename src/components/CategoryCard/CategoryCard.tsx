import './CategoryCard.css';

interface CategoryCardProps {
    title: string;
    image: string;
}

function CategoryCard({ title, image }: CategoryCardProps) {
    return (
        <div className="category-card">
            <img src={image} alt={title} className="category-img" />
            <div className="category-label">
                {title}
            </div>
        </div>
    );
}

export default CategoryCard;