import {Navigate, createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Todos from "./views/Todos";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/todos"/>
            },
            {
                path: '/todos',
                element: <Todos/>,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }

])

export default router;
