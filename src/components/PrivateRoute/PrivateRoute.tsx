import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: PropsWithChildren<unknown>) {
    const admin = localStorage.getItem('admin');
    return (
        <React.Fragment>
            {admin ? children : <Navigate to="/login" />}
        </React.Fragment>
    );
}

export default PrivateRoute;
