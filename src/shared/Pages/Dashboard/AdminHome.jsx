import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaWallet, FaUsers, FaBox, FaTruck } from "react-icons/fa"; // React Icons

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-states');
            return res.data;
        }
    });

    const { data: charts = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order/stats');
            return res.data
        }
    });

    console.log(charts);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
                <span>Hi, Welcome </span>
                {user?.displayName ? user?.displayName : 'Back'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Revenue Card */}
                <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6">
                    <FaWallet className="text-4xl mr-4" />
                    <div>
                        <div className="text-2xl font-bold">${stats.revenue || 0}</div>
                        <div className="text-sm">Revenue</div>
                    </div>
                </div>
                {/* Customers Card */}
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg p-6">
                    <FaUsers className="text-4xl mr-4" />
                    <div>
                        <div className="text-2xl font-bold">{stats.users || 0}</div>
                        <div className="text-sm">Customers</div>
                    </div>
                </div>
                {/* Products Card */}
                <div className="flex items-center bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg shadow-lg p-6">
                    <FaBox className="text-4xl mr-4" />
                    <div>
                        <div className="text-2xl font-bold">{stats.menuItems || 0}</div>
                        <div className="text-sm">Products</div>
                    </div>
                </div>
                {/* Orders Card */}
                <div className="flex items-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6">
                    <FaTruck className="text-4xl mr-4" />
                    <div>
                        <div className="text-2xl font-bold">{stats.orders || 0}</div>
                        <div className="text-sm">Orders</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;