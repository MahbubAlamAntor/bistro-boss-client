import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return
    }

    if (user || isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
};

export default AdminRoute;