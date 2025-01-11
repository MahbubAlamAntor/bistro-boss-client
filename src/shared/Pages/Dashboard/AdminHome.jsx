import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaWallet, FaUsers, FaBox, FaTruck } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

    // custom charts

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom pie charts

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = charts?.map(chart => {
        return { name: chart.category, value: chart.revenue }
    })

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
            <div className="flex mt-14">
                <div className="flex-1">
                    <BarChart
                        width={500}
                        height={400}
                        data={charts}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {charts.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="flex-1">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;