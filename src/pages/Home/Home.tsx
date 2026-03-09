// import Header from '../../components/Header/Header';
import ScrollBackground from '../../components/ScrollBackground/ScrollBackground';
import AboutSection from '../../components/AboutSection/AboutSection';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import './Home.css';

function Home() {
    return(
        <>
            {/* <Header /> */}
            <ScrollBackground />
            <AboutSection /> 
            <CategoriesSection />
        </>
    )
}

export default Home