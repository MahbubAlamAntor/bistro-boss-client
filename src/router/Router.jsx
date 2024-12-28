import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../shared/MainLayout/MainLayout";
import Home from "../shared/Home";

const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
        ]
    }
])

export default router