import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from '../../../utils/toast.utils';

const OAuthCallback = () => {
    const { provider } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const jwt = params.get('jwt');
        const error = params.get('error');

        if (error) {
            toast({
                type: 'error',
                message: `OAuth Provider: ${provider}\nError Message: ${error}`,
            });

            return navigate('/login');
        }

        if (jwt) window.localStorage.setItem('token', jwt);
        window.location.href = '/';
    }, [location]);

    return null;
};

export default OAuthCallback;
