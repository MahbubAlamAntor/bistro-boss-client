import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../shared/MainLayout/MainLayout";
import Home from "../shared/Home";
import Menu from "../shared/Menu/Menu";
import OurShop from "../Components/OurShop/OurShop";

const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/ourShop/:category',
                element: <OurShop></OurShop>
            }
        ]
    }
])

export default router