import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Navbar = () => {
    const { user, signOutHandle } = useContext(AuthContext);
    const [carts] = useCart();
    const [isAdmin] = useAdmin();


    const navOptions = (
        <>
            <div className="flex items-center space-x-6 uppercase text-sm font-semibold">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 border-b-2 border-yellow-400"
                                : "hover:text-yellow-400 text-white"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 border-b-2 border-yellow-400"
                                : "hover:text-yellow-400 text-white"
                        }
                    >
                        Our Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 border-b-2 border-yellow-400"
                                : "hover:text-yellow-400 text-white"
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/ourShop/salads"
                        className={({ isActive }) =>
                            isActive
                                ? "text-yellow-400 border-b-2 border-yellow-400"
                                : "hover:text-yellow-400 text-white"
                        }
                    >
                        Our Shop
                    </NavLink>
                </li>
                <li>
                    {
                        user && isAdmin && <NavLink
                            to="/dashboard/adminHome"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-400 border-b-2 border-yellow-400"
                                    : "hover:text-yellow-400 text-white"
                            }
                        >
                            Secret
                        </NavLink>
                    }
                    {
                        user && !isAdmin && <NavLink
                            to="/dashboard/userHome"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-400 border-b-2 border-yellow-400"
                                    : "hover:text-yellow-400 text-white"
                            }
                        >
                            Secret
                        </NavLink>
                    }
                </li>
            </div>
        </>
    );

    return (
        <div className="navbar fixed top-0 z-10 bg-black lg:px-44 bg-opacity-90 text-white shadow-md">
            <div className="navbar-start">
                <Link className="text-2xl font-bold text-white">
                    Bistro Boss
                    <span className="block text-sm font-light">Restaurant</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-4">{navOptions}</ul>
            </div>
            <div className="navbar-end flex items-center space-x-4">
                <div className="relative">
                    <NavLink
                        to="/dashboard/cart"
                        className="text-white hover:text-yellow-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L3 21h18M10 21a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 rounded-full bg-red-600 px-1 text-xs text-white">
                            {carts?.length}
                        </span>
                    </NavLink>
                </div>
                {
                    user ? <>
                        <button onClick={async () => await signOutHandle()} className="text-white hover:text-yellow-400 flex items-center space-x-1">Sign Out</button>
                    </> : <>
                        <NavLink
                            to="/login"
                            className="text-white hover:text-yellow-400 flex items-center space-x-1"
                        >
                            <span>Sign In</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                                />
                            </svg>
                        </NavLink>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;