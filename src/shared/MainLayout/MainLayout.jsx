import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = () => {
    const location = useLocation();
    const loginLocation = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div className="">
            {loginLocation || <Navbar></Navbar>}
            <Outlet></Outlet>
            {loginLocation || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;