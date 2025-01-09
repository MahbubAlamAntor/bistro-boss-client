import { useForm } from "react-hook-form";
import DynamicTitle from "../../../Components/DynamicTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

const api_key = import.meta.env.VITE_API_KEY;
const image_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const UpdateItems = () => {
    const items = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    console.log(items);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItems = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: res.data.data.display_url
            };
            const result = await axiosSecure.patch(`/menu/${items._id}`, menuItems)
            if (result.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manageItems')
            }
        }
        // console.log(res.data);
    };
    return (
        <div>
            <DynamicTitle heading='Update an Items' subHeading={`-----Refetch Items-----`}></DynamicTitle>
            <div className="bg-gray-100 p-8 rounded-md shadow-lg w-full max-w-4xl mx-auto mt-16">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Recipe Name */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            defaultValue={items?.name}
                            placeholder="Recipe name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            items?.category && <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Category*</span>
                                </label>
                                <select
                                    defaultValue={items?.category}
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full"

                                >
                                    <option>
                                        Select Category
                                    </option>
                                    <option value="dessert">Dessert</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="salad">Salad</option>
                                    <option value="soup">Soup</option>
                                </select>
                            </div>
                        }
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Price*</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="text"
                                defaultValue={items?.price}
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Recipe Details*</span>
                        </label>
                        <textarea
                            {...register("recipe", { required: true })}
                            placeholder="Recipe Details"
                            defaultValue={items?.recipe}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Upload Image</span>
                        </label>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="btn mx-auto btn-primary w-full md:w-auto px-8 flex items-center gap-2 justify-center">
                            Update Recipe Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;