import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: PropsWithChildren<unknown>) {
    const isLogged = localStorage.getItem('isLogged');
    console.log(isLogged);
    return <div>{isLogged ? children : <Navigate to="/login" />}</div>;
}

export default ProtectedRoute;
