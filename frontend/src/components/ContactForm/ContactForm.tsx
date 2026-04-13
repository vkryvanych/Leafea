import { useContactForm } from '../../hooks/useContactForm';
import './ContactForm.css';

function ContactForm() {
    const { handleSubmit, isLoading, isSuccess, error } = useContactForm();

    if (isSuccess) {
        return (
            <div className="contact-success-message">
                <h3>Дякуємо!</h3>
                <p>Ваше повідомлення відправлено.</p>
            </div>
        );
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input name="name" type="text" placeholder="ІМ'Я АБО НІКНЕЙМ" required />
            </div>
            
            <div className="form-row split">
                <input name="email" type="email" placeholder="EMAIL" required />
                <input name="phone" type="text" placeholder="ТЕЛЕФОН (НЕОБОВ'ЯЗКОВО)" />
            </div>
            
            <div className="form-row">
                <textarea name="message" placeholder="ТВОЄ ПОВІДОМЛЕННЯ..." rows={1} required></textarea>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="form-submit-wrapper">
                <button type="submit" className="contact-submit-btn" disabled={isLoading}>
                    {isLoading ? (
                        <span>...</span> 
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </button>
            </div>
        </form>
    );
}

export default ContactForm;