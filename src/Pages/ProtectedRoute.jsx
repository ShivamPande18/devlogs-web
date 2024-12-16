import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/register" replace />;
    }
    return children;
};