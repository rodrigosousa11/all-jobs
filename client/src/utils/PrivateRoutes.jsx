import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const auth = { token: token };

    return(
        auth.token ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;
