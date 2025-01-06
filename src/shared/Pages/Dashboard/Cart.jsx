import DynamicTitle from "../../../Components/DynamicTitle";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
    const [carts, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    // console.log(carts);
    const totalPrice = carts.reduce((sum, items) => sum + items.price, 0);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }

    return (
        <div>
            <DynamicTitle heading='My Cart' subHeading='Wanna Add More?'></DynamicTitle>
            <div className="flex justify-evenly pt-4 items-center mb-11">
                <h2 className="text-5xl">Items: {carts.length}</h2>
                <h2 className="text-5xl">Total Price: {totalPrice}</h2>
                <button className="btn btn-primary">Pay Now</button>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carts.map((cart, idx) => <tr key={cart._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={cart?.image}
                                                        alt={cart?.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cart?.name}
                                    </td>
                                    <td>$ {cart?.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(cart._id)}><FaTrashAlt className="text-red-600" size={25}></FaTrashAlt></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;