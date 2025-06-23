import { Routes, Route, Navigate } from "react-router-dom";
import { RiCalendarTodoLine } from "react-icons/ri";
import { lazy, Suspense } from "react";
import Sidebar from "@components/Sidebar";
import ProtectedRoute from "@routes/ProtectedRoute";
import { useAuth } from "@contexts/AuthProvider";
import { Icons } from "@assets/icons";
import { useUIContext } from "@contexts/UIProvider";

const Login = lazy(() => import("./pages/auth/Login"));
const Todo = lazy(() => import("./pages/todos/Todo"));
// const Ticket = lazy(() => import("./pages/todos/Todo"));

const App = () => {
    const { isSidebarOpen, toggleSidebar } = useUIContext()
    const { user, isLoading } = useAuth();
    return (
        <div className="h-screen flex flex-col bg-[#F6F6F6]">
            {user && !isLoading && (
                <header className="h-12 md:h-8 flex items-center px-4 justify-between">
                    <h1 className="text-xs font-semibold text-gray-700 tracking-tight flex gap-2 items-center">
                        <RiCalendarTodoLine fontSize={14} /> Chawla To Do
                    </h1>
                    <button onClick={toggleSidebar} className="text-gray-700 sm:hidden sm:text-xs text-lg">
                        {!isSidebarOpen && <Icons.MenuButtonWide />}
                    </button>
                </header>
            )}
            <div className="flex flex-1 overflow-hidden">
                {user && !isLoading && <Sidebar />}
                <main className="flex-1 bg-gray-50 overflow-auto scrollbar-hide rounded-tl-xl rounded-tr-xl sm:rounded-tr-none  border border-gray-200">
                    <Routes>
                        <Route element={<ProtectedRoute isProtected={true} />}>
                            <Route
                                path="/"
                                element={
                                    <Suspense fallback={<div className="p-4">Loading Todo...</div>}>
                                        <Todo />
                                    </Suspense>
                                }
                            />
                        </Route>

                        <Route element={<ProtectedRoute isProtected={false} />}>
                            <Route
                                path="/login"
                                element={
                                    <Suspense fallback={<div className="p-4">Loading Login...</div>}>
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
                                    state={user ? { filter: "today" } : undefined}
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
