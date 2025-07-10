import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { RiCalendarTodoLine } from "react-icons/ri";
import { lazy, Suspense, useEffect, useState } from "react";
import Sidebar from "@components/Sidebar";
import ProtectedRoute from "@routes/ProtectedRoute";
import { useAuth } from "@contexts/AuthProvider";
import { Icons } from "@assets/icons";
import { useUIContext } from "@contexts/UIProvider";
import DeleteAlertModal from "@components/DeleteAlertModal";
import PageLoader from "@components/PageLoader";
import { io } from "socket.io-client";
import { useFirebaseMessaging } from "@hooks/useFirebaseMessaging";
const Login = lazy(() => import("./pages/auth/Login"));
const Todo = lazy(() => import("./pages/todos/Todo"));
const Ticket = lazy(() => import("./pages/tickets/Ticket"));
const TicketDetail = lazy(() => import("./pages/tickets/TicketDetail"));

const App = () => {
    const { isSidebarOpen, toggleSidebar } = useUIContext();
    const { user, isLoading, logout, setSocket } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const { notification } = useFirebaseMessaging();

    useEffect(() => {
        if (notification) {
            // Handle the notification
            console.log("New notification:", notification);
        }
    }, [notification]);
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("userId");
            navigate("/login");
            setShowLogoutModal(false);
        } catch (error) { }
    };

    useEffect(() => {
        // const newSocket = io('https://chawlacomponents.in/');
        // const newSocket = io("https://test.chawlacomponents.in/");
        const newSocket = io('http://localhost:5050');
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <div className="h-screen flex flex-col bg-[#F6F6F6]">
            {/* Logout Confirmation Modal */}
            <DeleteAlertModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleConfirmLogout}
                title="Logout Confirmation"
                description="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
                maxWidth="max-w-sm"
            />

            {/* Header */}
            {user && !isLoading && (
                <header className="h-12 md:h-8 flex items-center px-4 justify-between">
                    <h1 className="text-[14px] font-semibold text-gray-700 tracking-tight flex gap-2 items-center">
                        <RiCalendarTodoLine fontSize={20} /> Chawla To Do
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogoutClick}
                            className="text-gray-700 sm:text-xs text-lg cursor-pointer">
                            <Icons.Logout fontSize={22} />
                        </button>
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-700 sm:hidden sm:text-xs text-lg">
                            {!isSidebarOpen && <Icons.MenuButtonWide />}
                        </button>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {user && !isLoading && <Sidebar />}
                <main className="flex-1 bg-gray-50 overflow-auto scrollbar-hide rounded-tl-xl rounded-tr-xl sm:rounded-tr-none border border-gray-200">
                    <Routes>
                        <Route element={<ProtectedRoute isProtected={true} />}>
                            <Route
                                path="/"
                                element={
                                    <Suspense
                                        fallback={
                                            <PageLoader message="Loading Todo..." />
                                        }>
                                        <Todo />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/tickets"
                                element={
                                    <Suspense
                                        fallback={
                                            <PageLoader message="Loading Tickets..." />
                                        }>
                                        <Ticket />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/tickets/:id"
                                element={
                                    <Suspense
                                        fallback={
                                            <PageLoader message="Loading Ticket Detail..." />
                                        }>
                                        <TicketDetail />
                                    </Suspense>
                                }
                            />
                        </Route>
                        <Route element={<ProtectedRoute isProtected={false} />}>
                            <Route
                                path="/login"
                                element={
                                    <Suspense
                                        fallback={
                                            <PageLoader message="Loading Login..." />
                                        }>
                                        <Login />
                                    </Suspense>
                                }
                            />
                        </Route>

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to={user ? "/" : "/login"}
                                    replace
                                    state={
                                        user ? { filter: "today" } : undefined
                                    }
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
