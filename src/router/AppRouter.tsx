import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import Contact from "../pages/Contact/Contact";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop"; 
import Cabinet from "../pages/Cabinet/Cabinet";

function AppRouter() {
  return (
    <>
      <ScrollToTop /> 
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cabinet" element={<Cabinet />} />
        </Route>
      </Routes>

    </> 
  );
}

export default AppRouter;