import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from '@pages/About';
import Home from '@pages/Home';
import TestBB from '@pages/TestBB';
import TestSS from '@pages/TestSS';
import TestVS from '@pages/TestVS';
import TestSM from '@pages/TestSM';
import TestMB from '@pages/TestMB';
import Header from '@components/Header/Header';
import LoginPage from '@pages/LoginPage';
import Timesheet from '@pages/Timesheet';
import TimesheetDetails from '@components/TimesheetDetails';
import Test from '@components/PrivateRoute/Test';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';
import Layout from '@components/Layout';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/testmb" element={<TestMB />} />
            </Routes>

            <Layout>
                <Routes>
                    <Route
                        path="/header"
                        element={
                            <ProtectedRoute>
                                <Header />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/header"
                        element={
                            <PrivateRoute>
                                <Header />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <PrivateRoute>
                                <About />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/test1"
                        element={
                            <PrivateRoute>
                                <Test />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/testsm" element={<TestSM />} />
                    <Route path="/testvs" element={<TestVS />} />
                    <Route path="/testbb" element={<TestBB />} />
                    <Route path="/testss" element={<TestSS />} />
                    <Route path="/timesheet" element={<Timesheet />} />
                    <Route
                        path="/timesheet/:day/:month/:year"
                        element={<TimesheetDetails />}
                    />
                    <Route path="/testmb" element={<TestMB />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
