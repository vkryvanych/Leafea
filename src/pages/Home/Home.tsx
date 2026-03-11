// import Header from '../../components/Header/Header';
import ScrollBackground from '../../components/ScrollBackground/ScrollBackground';
import AboutSection from '../../components/AboutSection/AboutSection';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import Footer from '../../components/Footer/Footer'
import './Home.css';

function Home() {
    return(
        <>
            <ScrollBackground />
            <AboutSection /> 
            <CategoriesSection />
            <Footer />
        </>
    )
}

export default Home