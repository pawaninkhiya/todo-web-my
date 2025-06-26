import { useAuth } from "@contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isProtected: boolean;
}

const ProtectedRoute = ({ isProtected }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative w-20 h-20">
                    {/* Beautiful inset loader */}
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
        return <Navigate to="/login" replace />;
    }

    if (!isProtected && user) {
        return <Navigate to="/" replace state={{ filter: "today" }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
