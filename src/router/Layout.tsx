import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/" || location.pathname === "/home";

    return (
        <>
            {!isHomePage && <Header />}
          
            <main>
                <Outlet /> 
            </main>
          
            <Footer />
        </>
    );
}

export default Layout;