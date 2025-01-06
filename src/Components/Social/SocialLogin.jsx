import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        signInWithGoogle()
        .then(result => {
            const userData = {
                name: result.user.displayName,
                email: result.user.email
            }
            axiosPublic.post('/users', userData)
            .then(result => {
                navigate('/')
            })
        })
    }
    return (
        <div>
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleLogin} className="p-3 w-full justify-center text-center bg-blue-500 text-white flex items-center gap-2 rounded-lg"><FaGoogle></FaGoogle> Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;