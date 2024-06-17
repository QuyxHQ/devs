import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../context/AppProvider';
import { useEffect } from 'react';
import { Layout, Logo } from '..';

const Middleware = ({ children }: { children: React.JSX.Element }) => {
    const navigate = useNavigate();
    const { isMounting, isLoggedIn } = useAppStore();

    const unprotectedRoutes = ['/login'];
    const outOfLayoutRoutes = [...unprotectedRoutes];

    useEffect(() => {
        (function () {
            if (!isMounting) {
                if (isLoggedIn && unprotectedRoutes.includes(location.pathname)) {
                    return navigate('/');
                }

                if (!isLoggedIn) {
                    if (!unprotectedRoutes.includes(location.pathname)) {
                        return navigate('/login');
                    }
                }
            }
        })();
    }, [isMounting, isLoggedIn, navigate]);

    return isMounting ? (
        <div
            className="middleware-loader d-flex align-items-center justify-content-center w-100"
            style={{ height: '100vh' }}
        >
            <Logo width={50} height={50} />
        </div>
    ) : !isLoggedIn && !unprotectedRoutes.includes(location.pathname) ? null : isLoggedIn &&
      unprotectedRoutes.includes(location.pathname) ? null : outOfLayoutRoutes.includes(
          location.pathname
      ) ? (
        children
    ) : (
        <Layout children={children} />
    );
};

export default Middleware;
