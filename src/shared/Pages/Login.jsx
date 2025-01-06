import { useContext, useEffect, useState } from 'react';
import loginBg from '../../assets/assets/others/authentication.png';
import leftSiteBarImage from '../../assets/assets/others/authentication2.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../../Components/Social/SocialLogin';

const Login = () => {
    const [disable, setDisable] = useState(true);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const pathname = location.state?.form?.pathname || '/';


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false);
        }
        else {
            setDisable(true)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: "Login Success",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(pathname, {replace: true})
            })
    }
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <div
                className="hero bg-base-200 min-h-screen"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
                <div className="hero-content flex-col lg:flex-row justify-between">
                    {/* Sidebar Image */}
                    <div className="hidden lg:block w-1/2">
                        <img src={leftSiteBarImage} alt="Sidebar Illustration" className="w-full h-auto" />
                    </div>

                    {/* Login Card */}
                    <div className="card bg-base-100 w-full max-w-md shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Type here"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            {/* Captcha Section */}
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    name='captcha'
                                    placeholder="Type the captcha"
                                    className="input input-bordered mt-2"
                                    required
                                />
                            </div>
                            <div className="form-control mt-4">
                                <input type="submit" disabled={disable} className="btn btn-primary w-full" value="Sign In" />
                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        <p className="text-center mt-4 text-sm">
                            New here?{" "}
                            <Link to='/register' className="text-primary font-medium">
                                Create a New Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;