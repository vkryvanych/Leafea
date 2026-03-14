import './ContactForm.css';

function ContactForm() {
    return (
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
                <input type="text" placeholder="ІМ'Я АБО НІКНЕЙМ" required />
            </div>
            
            <div className="form-row split">
                <input type="email" placeholder="EMAIL" required />
                <input type="text" placeholder="ТЕЛЕФОН (НЕОБОВ'ЯЗКОВО)" />
            </div>
            
            <div className="form-row">
                <textarea placeholder="ТВОЄ ПОВІДОМЛЕННЯ..." rows={1} required></textarea>
            </div>
            
            <div className="form-submit-wrapper">
                <button type="submit" className="contact-submit-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default ContactForm;