import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: PropsWithChildren<unknown>) {
    const isLogged = localStorage.getItem('isLogged');
    console.log(isLogged);
    return (
        <React.Fragment>
            {isLogged ? children : <Navigate to="/login" />}
        </React.Fragment>
    );
}

export default ProtectedRoute;
