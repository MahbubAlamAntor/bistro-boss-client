const FoodCard = ({ item }) => {
    const { name, image, recipe, price } = item || {}

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className="bg-black px-4 text-white absolute right-3 top-3 rounded-xl py-1">${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Add To Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;