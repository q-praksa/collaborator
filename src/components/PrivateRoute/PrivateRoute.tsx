import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const admin = localStorage.getItem('admin');
    const isLoggedIn = localStorage.getItem('isLogged');

    return admin && isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
