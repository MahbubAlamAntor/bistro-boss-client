import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return 
    }

    if(user){
        return children;
    }
    return <Navigate to='/login' state={{form : location}} replace></Navigate>
};

export default PrivateRoute;