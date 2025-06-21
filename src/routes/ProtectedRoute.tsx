import { useAuth } from "@contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isProtected: boolean;
}

const ProtectedRoute = ({ isProtected }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Checking authentication...</p>
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
