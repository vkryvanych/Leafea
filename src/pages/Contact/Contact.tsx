import ContactForm from '../../components/ContactForm/ContactForm';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import './Contact.css';

function Contact() {
    return (
        <section className="contact-page">
            <div className="contact-container">
                <div className="contact-left">
                    <h1 className="contact-title">
                        LET'S<br />
                        GET IN TOUCH
                    </h1>
                    <div className="contact-decorative-shape"></div>
                </div>
                <div className="contact-right">
                    <ContactForm />
                    <ContactInfo />
                </div>

            </div>
        </section>
    );
}

export default Contact;