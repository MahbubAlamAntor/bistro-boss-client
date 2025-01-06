import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DynamicTitle from "../../../Components/DynamicTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageItems = () => {
    const [menu,, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleItemsDelete = (id) => {
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
                axiosSecure.delete(`/menu/${id}`)
                    .then(result => {
                        console.log(result.data);
                        if (result.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Items Deleted SuccessFull !!!!",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <DynamicTitle heading='Manage All Items' subHeading={`---Hurry Up!---`}></DynamicTitle>
            <div className="mt-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>Image</th>
                                <th>Items Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu?.map((items, idx) => <tr key={items._id}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={items?.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {items.name}
                                    </td>
                                    <td>{items.price}</td>
                                    <td>
                                        <button className=""><FaEdit className="bg-orange-500  rounded-lg text-white w-16 h-9 p-2" size={25}></FaEdit></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleItemsDelete(items._id)}><FaTrashAlt className="text-red-600" size={30}></FaTrashAlt></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;