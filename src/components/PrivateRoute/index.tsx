import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const isAdmin = localStorage.getItem('role') == 'admin';
    const isLoggedIn = localStorage.getItem('refreshToken');

    return isAdmin && isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
