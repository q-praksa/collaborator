import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const isLogged = localStorage.getItem('isLogged');
    const isUser = localStorage.getItem('user');

    return isLogged && isUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
