import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../../Components/DynamicTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res?.data;
        }
    });
    console.log(payments);
    return (
        <div>
            <DynamicTitle heading='PAYMENT HISTORY' subHeading={`---At a Glance!---`}></DynamicTitle>
            <div >
                <h2 className="text-3xl font-bold mb-2">Total Payments: {payments?.length}</h2>
                <div className="overflow-hidden rounded-lg">
                    <table className="table">
                        <thead className="bg-orange-400 text-white rounded-lg">
                            <tr>
                                <th>No</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Transaction</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.paymentId}</td>
                                    <td className="bg-green-500 text-white text-center">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;