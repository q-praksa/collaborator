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
import AdminOverview from '@pages/AdminOverview';
import People from '@pages/People';
import Profile from '@pages/Profile';
import Projects from '@pages/Projects';
import ErrorPage from '@pages/ErrorPage';
import ErrorBoundary from '@components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="header"
                            element={
                                <ProtectedRoute>
                                    <Header />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="header"
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
                            path="about"
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <PrivateRoute>
                                    <About />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="test1"
                            element={
                                <PrivateRoute>
                                    <Test />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/people"
                            element={
                                <ProtectedRoute>
                                    <People />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/projects"
                            element={
                                <ProtectedRoute>
                                    <Projects />
                                </ProtectedRoute>
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
                        <Route path="/error" element={<ErrorPage />} />
                        <Route
                            path="overview"
                            element={
                                <PrivateRoute>
                                    <AdminOverview />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
