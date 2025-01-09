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
            <div>
                <h2 className="text-3xl font-bold">Total Payments: {payments?.length}</h2>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Email</th>
                                    <th>Category</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    payments.map((payment, index) => <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{payment.email}</td>
                                        <td>{}</td>
                                        <td>Blue</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;