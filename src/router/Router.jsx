import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../shared/MainLayout/MainLayout";
import Home from "../shared/Home";
import Menu from "../shared/Menu/Menu";
import OurShop from "../Components/OurShop/OurShop";
import Login from "../shared/Pages/Login";
import Register from "../shared/Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../shared/Secret/Secret";
import Dashboard from "../shared/Pages/Dashboard/Dashboard";
import Cart from "../shared/Pages/Dashboard/Cart";
import AllUser from "../shared/Pages/Dashboard/AllUser/AllUser";
import AddItems from "../shared/Pages/Dashboard/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../shared/Pages/Dashboard/ManageItems";

const router = createBrowserRouter([
    {
        path: '/',
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
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/secret',
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user
            {
                path: 'cart',
                element: <Cart></Cart>
            },

            // admin data
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'allUser',
                element: <PrivateRoute><AllUser></AllUser></PrivateRoute>
            }
        ]
    }
])

export default router