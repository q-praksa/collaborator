import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import TestBB from './pages/TestBB';
import TestSS from './pages/TestSS';
import TestVS from './pages/TestVS';
import TestSM from './pages/TestSM';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/header" element={<Header />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/testsm" element={<TestSM />} />
                    <Route path="/testvs" element={<TestVS />} />
                    <Route path="/testbb" element={<TestBB />} />
                    <Route path="/testss" element={<TestSS />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
