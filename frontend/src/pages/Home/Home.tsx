import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollBackground from '../../components/ScrollBackground/ScrollBackground';
import AboutSection from '../../components/AboutSection/AboutSection';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import './Home.css';

function Home() {
    const location = useLocation();

  
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {

                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return(
        <>
            <ScrollBackground />
            <AboutSection /> 
            <CategoriesSection />
        </>
    )
}

export default Home;