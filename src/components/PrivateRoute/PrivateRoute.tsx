import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: PropsWithChildren<unknown>) {
    const admin = localStorage.getItem('admin');
    return <div>{admin ? children : <Navigate to="/login" />}</div>;
}

export default PrivateRoute;
