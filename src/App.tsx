import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "@components/Sidebar";
import { useAuth } from "@contexts/AuthProvider";
import { Icons } from "@assets/icons";
import { useUIContext } from "@contexts/UIProvider";
import DeleteAlertModal from "@components/DeleteAlertModal";
import logo from "@assets/logo.png";
import { io } from "socket.io-client";
import AppRoutes from "@routes/TodoRoutes";

const App = () => {
    const { isSidebarOpen, toggleSidebar } = useUIContext();
    const { user, isLoading, logout, setSocket } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

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
        const newSocket = io("https://test.chawlacomponents.in/");
        // const newSocket = io("http://localhost:5050");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <div className="h-screen flex flex-col bg-[#F6F6F6]">
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
                        <img src={logo} alt="logo" width={17} />Chawla To Do
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
                    <AppRoutes />
                </main>
            </div>
        </div>
    );
};

export default App;