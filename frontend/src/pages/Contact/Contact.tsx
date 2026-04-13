import ContactForm from '../../components/ContactForm/ContactForm';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import bt_1 from '../../assets/bt_1.png';
import './Contact.css';

function Contact() {
    return (
        <section className="contact-page">
            <img src={bt_1} alt="Leafea Butterfly" className="contact-butterfly" />
            <div className="contact-container">
                <div className="contact-left">
                    <h1 className="contact-title">
                        LET'S<br />
                        GET IN TOUCH
                    </h1>
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