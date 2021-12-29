import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import TestBB from './pages/TestBB';
import TestSS from './pages/TestSS';
import TetstBB from './pages/TetstBB';
import TestVS from './pages/TestVS';
import Header from './components/Header/Header';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/header" element={<Header />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/testbb" element={<TetstBB />} />
                <Route path="/testvs" element={<TestVS />} />
                <Route path="/testbb" element={<TestBB />} />
                <Route path="/testss" element={<TestSS />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
