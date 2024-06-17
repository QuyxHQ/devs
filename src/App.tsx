import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css';
import {
    Spaces,
    Dashboard,
    Login,
    NotFound,
    Profile,
    Logs,
    SingleSpace,
    Users,
    Middleware,
    OAuthCallback,
} from './entry';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Middleware children={<Dashboard />} />,
            errorElement: <NotFound />,
        },
        {
            path: '/login',
            element: <Middleware children={<Login />} />,
        },
        {
            path: '/spaces',
            element: <Middleware children={<Spaces />} />,
        },
        {
            path: '/profile',
            element: <Middleware children={<Profile />} />,
        },
        {
            path: '/logs',
            element: <Middleware children={<Logs />} />,
        },
        {
            path: '/space/:did',
            element: <Middleware children={<SingleSpace />} />,
        },
        {
            path: '/space/users/:did',
            element: <Middleware children={<Users />} />,
        },
        {
            path: '/oauth/callback/:provider',
            element: <OAuthCallback />,
        },
    ]);

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <RouterProvider router={router} />
        </>
    );
};

export default App;
