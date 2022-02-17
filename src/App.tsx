import { Routes, Route } from 'react-router-dom';
import Graphs from '@pages/Graphs';
import LoginPage from '@pages/Loginpage';
import Timesheet from '@pages/Timesheet';
import TimesheetDetails from '@components/TimesheetDetails';
import PrivateRoute from '@components/PrivateRoute';
import ProtectedRoute from '@components/ProtectedRoute';
import Layout from '@components/Layout';
import NotFoundPage from '@pages/NotFoundPage';
import AdminOverview from '@pages/AdminOverview';
import UserOverview from '@pages/UsersOverview';
import People from '@pages/People';
import Profile from '@pages/Profile';
import Projects from '@pages/Projects';
import ErrorPage from '@pages/ErrorPage';
import ErrorBoundary from '@components/ErrorBoundary';
import ClientPage from '@components/Clients';
import CustomRouter from '@components/CustomRouter';
import customHIstory from '@components/CustomRouter/history';
import SignUp from '@components/SignUp';
import SingleClient from '@pages/SingleClient';

function App() {
    return (
        <ErrorBoundary>
            <CustomRouter history={customHIstory}>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<Layout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<UserOverview />} />
                            <Route
                                path="user-overview"
                                element={<UserOverview />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/timesheet" element={<Timesheet />} />
                            <Route
                                path="/timesheet/:dayMonthYear"
                                element={<TimesheetDetails />}
                            />
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<AdminOverview />} />
                            <Route
                                path="/admin-overview"
                                element={<AdminOverview />}
                            />
                            <Route path="/people" element={<People />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/clients" element={<ClientPage />} />
                            <Route
                                path="/clients/:id"
                                element={<SingleClient />}
                            />
                            <Route path="/adminprofile" element={<Profile />} />
                            <Route path="/stats" element={<Graphs />} />
                        </Route>
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </CustomRouter>
        </ErrorBoundary>
    );
}

export default App;
