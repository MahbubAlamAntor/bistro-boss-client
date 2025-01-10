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
import UpdateItems from "../shared/Pages/Dashboard/UpdateItems";
import Payment from "../shared/Pages/Dashboard/Payment";
import PaymentHistory from "../shared/Pages/Dashboard/PaymentHistory";
import UserHome from "../shared/Pages/Dashboard/UserHome";
import AdminHome from "../shared/Pages/Dashboard/AdminHome";

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
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },


            // admin data
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'update/:id',
                element: <AdminRoute><UpdateItems></UpdateItems> </AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: 'allUser',
                element: <PrivateRoute><AllUser></AllUser></PrivateRoute>
            }
        ]
    }
])

export default router