import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@contexts/AuthProvider";

interface ProtectedRouteProps {
    isProtected: boolean;
}

const ProtectedRoute = ({ isProtected }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 p-1">
                        <div className="flex h-full w-full items-center justify-center rounded-md bg-white">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isProtected && !user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!isProtected && user) {
        return <Navigate to="/" replace state={{ filter: "today" }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
