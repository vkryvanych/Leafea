import './ContactInfo.css';

function ContactInfo() {
    return (
        <div className="contact-info-footer">
            <div className="info-column">
                <h4>LEAFEA HQ</h4>
                <p>Орбітальна станція 42<br />Ужгород, Україна</p>
                <p className="contact-phone">+380 99 123 45 67</p>
            </div>
            <div className="info-column">
                <h4>ЕЛЕКТРОННА ПОШТА</h4>
                <p>hello@leafea.space<br />support@leafea.space</p>
            </div>
        </div>
    );
}

export default ContactInfo;