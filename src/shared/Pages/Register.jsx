import { Link, useLocation, useNavigate } from "react-router-dom";
import registerBg from '../../assets/assets/others/authentication.png';
import leftSiteBar from '../../assets/assets/others/authentication2.png'
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/Social/SocialLogin";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.state?.form?.pathname || '/';


    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userData = {
                            name: data.name,
                            email: data.email
                        }
                        // console.log(result)
                        axiosPublic.post('/users', userData)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Register SuccessFull",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    navigate(pathname, { replace: true })
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            })
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Register</title>
            </Helmet>

            <div
                className="hero bg-base-200 min-h-screen"
                style={{ backgroundImage: `url(${registerBg})` }}
            >
                <div className="hero-content flex-col lg:flex-row justify-between">


                    {/* Login Card */}
                    <div className="card bg-base-100 w-full max-w-md shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    name='name'
                                    placeholder="Enter your name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Photo URL</span>
                                </label>
                                <input
                                    {...register("photo", { required: true })}
                                    type="text"
                                    name='photo'
                                    placeholder="Enter your Photo URL"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                    required
                                />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <input
                                    {...register("password", { required: true, maxLength: 15, minLength: 8, pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/ })}
                                    type="password"
                                    name='password'
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type == 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type == 'minLength' && <span className="text-red-600">Min need 8digit</span>}
                                {errors.password?.type == 'maxLength' && <span className="text-red-600">Mix Use 10 digit</span>}
                                {errors.password?.type == 'pattern' && <span className="text-red-600">Must need one uppercase one lower chase and one digit</span>}
                            </div>
                            <div className="form-control mt-4">
                                <input type="submit" className="btn btn-primary w-full" value="Sign Up" />
                            </div>
                            <SocialLogin></SocialLogin>
                        </form>
                        <p className="text-center mt-4 text-sm">
                            Already here?{" "}
                            <Link to='/login' className="text-primary font-medium">
                                Login Now
                            </Link>
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="hidden lg:block w-1/2">
                        <img src={leftSiteBar} alt="Sidebar Illustration" className="w-full h-auto" />
                    </div>
                </div>
            </div >
        </>
    );
};

export default Register;