import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const ProtectedRoute = () => {
    const isLogged = useSelector((state: RootState) => state.login.isLoggedIn);

    return <div>{isLogged ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
