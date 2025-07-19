import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import PageLoader from '@components/PageLoader';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '@contexts/AuthProvider';

const AppRoutes = () => {
    const { user } = useAuth();

    // Lazy-loaded components
    const Login = lazy(() => import("@pages/auth/Login"));
    const Todo = lazy(() => import("@pages/todos/Todo"));
    const Ticket = lazy(() => import("@pages/tickets/Ticket"));
    const TicketDetail = lazy(() => import("@pages/tickets/TicketDetail"));
    const KraCreate = lazy(() => import("@pages/kra/KraCreate"));

    return (
        <Routes>
            <Route element={<ProtectedRoute isProtected={true} />}>
                {/* Dashboard/Todo */}
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<PageLoader message="Loading Todo..." />}>
                            <Todo />
                        </Suspense>
                    }
                />

                {/* Tickets */}
                <Route
                    path="/tickets"
                    element={
                        <Suspense fallback={<PageLoader message="Loading Tickets..." />}>
                            <Ticket />
                        </Suspense>
                    }
                />
                <Route
                    path="/tickets/:id"
                    element={
                        <Suspense fallback={<PageLoader message="Loading Ticket Detail..." />}>
                            <TicketDetail />
                        </Suspense>
                    }
                />

                {/* KRA Routes */}
                <Route
                    path="/kra/create"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <KraCreate />
                        </Suspense>
                    }
                />
            </Route>

            {/* Public Routes */}
            <Route element={<ProtectedRoute isProtected={false} />}>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<PageLoader message="Loading Login..." />}>
                            <Login />
                        </Suspense>
                    }
                />
            </Route>

            {/* Catch-all Route */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={user ? "/" : "/login"}
                        replace
                        state={user ? { filter: "today" } : undefined}
                    />
                }
            />
        </Routes>
    );
}

export default AppRoutes;