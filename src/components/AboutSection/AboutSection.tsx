import './AboutSection.css';
import butterfly_1 from '../../assets/butterfly_1.png';
import lillies from '../../assets/lillies.png';

function AboutSection() {
    return (
        <section id="about" className="about-section">
            
            <div className="about-content">
                <h2 className="about-title">
                    <span className="underline-text">Про</span> 
                    <span className="highlight-text">Leafea</span>
                </h2>
                
                <div className="about-text">
                    <p>
                        Забудь про довгі пошуки ідеального контенту - з Leafea ти знайдеш, що дивитися або читати, всього за 1 хвилину. Наш простий інтерактивний тест аналізує твої уподобання та поточний настрій, щоб запропонувати персоналізовані підбірки фільмів, серіалів, книг та аніме.
                    </p>
                    <p>
                        Наша перевага в тому, що ми враховуємо не тільки жанри, але й твій настрій та доступний час, роблячи кожну рекомендацію максимально корисною. Ти економиш свій час, зберігаєш усі цікаві знахідки в одному місці та постійно відкриваєш новий контент, який підходить саме тобі.
                    </p>
                </div>
            </div>
            <div className="about-visuals">
                <img src={butterfly_1} alt="Butterfly" className="visual-butterfly" />
                <img src={lillies} alt="Glowing Lillies" className="visual-lillies" />
            </div>

        </section>
    );
}

export default AboutSection;