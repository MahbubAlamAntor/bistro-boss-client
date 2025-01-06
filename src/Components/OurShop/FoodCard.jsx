import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { name, image, recipe, price, _id } = item || {};
    const navigate = useNavigate();
    const location = useLocation();
    const [,refetch] = useCart();

    const handleAddToCart = async (food) => {
        if (user && user.email) {
            const foodData = {
                foodId: _id,
                name, image, recipe, price, email: user?.email
            }

            await axiosSecure.post('/carts', foodData)
                .then(result => {
                    console.log(result)
                    if (result.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Data Save Success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }

                })

        } else {
            Swal.fire({
                title: "You are not login",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { form: location } })
                }
            });
        }
    }

    return (
        <div>
            <div className="card bg-base-100 text-center flex items-center shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className="bg-black px-4 text-white absolute right-3 top-3 rounded-xl py-1">${price}</p>
                <div className="card-body ">
                    <h2 className="card-title mx-auto">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions mx-auto">
                        <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 border-orange-400">Add To Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;