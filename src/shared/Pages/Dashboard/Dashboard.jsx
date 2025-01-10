import { CiMenuBurger } from "react-icons/ci";
import { FaAd, FaCalendar, FaCalendarAlt, FaHome, FaList, FaMoneyBill, FaShoppingCart, FaStreetView, FaUsers, FaUtensils, FaVoicemail } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";


const Dashboard = () => {
    const [card] = useCart();

    
    const [isAdmin] = useAdmin();
    console.log(isAdmin);


    return (
        <div className="flex container mx-auto">
            {/* dashboard site bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <div className="text-center mt-10 mb-4">
                    <h2 className="font-bold text-2xl">Bistro Boss</h2>
                    <p className="uppercase">Restaurant</p>
                </div>
                <ul className="menu space-y-4">
                    {
                        isAdmin ? <>
                            <li className="text-white text-lg"><NavLink to="/dashboard/adminHome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils> Add Items</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/manageItems"> <FaList></FaList> Manage Items</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/manageBookings"> <FaAd></FaAd> Manage Bookings </NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/allUser"> <FaUsers></FaUsers> All Users</NavLink></li>
                        </> : <>
                            <li className="text-white text-lg"><NavLink to="/dashboard/userHome"><FaHome></FaHome> User Home</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar> Reservation</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/paymentHistory"><FaMoneyBill></FaMoneyBill> Payment History</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart ({card.length}) </NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/review"><FaStreetView></FaStreetView> Add Review</NavLink></li>
                            <li className="text-white text-lg"><NavLink to="/dashboard/calender"><FaCalendarAlt></FaCalendarAlt></NavLink></li>
                        </>
                    }

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li className="text-white text-lg"><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                    <li className="text-white text-lg"><NavLink to="/order/menu"><CiMenuBurger></CiMenuBurger> Menu</NavLink></li>
                    <li className="text-white text-lg"><NavLink to="/order/shop"><IoCartSharp></IoCartSharp> Shop</NavLink></li>
                    <li className="text-white text-lg"><NavLink to="/order/contact"> <FaVoicemail></FaVoicemail> Contact</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;