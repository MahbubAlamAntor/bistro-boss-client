import { Link } from "react-router-dom";
import DynamicTitle from "../../Components/DynamicTitle";
import Cover from "../Menu/Cover";
import MenuCard from "../MenuCard";

const MenuCategory = ({ items, title, description, subTitle, subDescription, img1 }) => {
    return (
        <div>
            {title && <DynamicTitle heading={title} subHeading={description}></DynamicTitle>}
            {subTitle && <Cover title={subTitle} img={img1} description={subDescription}></Cover>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-11">
                {
                    items?.map(item => <MenuCard key={item._id} item={item}></MenuCard>)
                }
            </div>
            <div className="flex justify-center">
                <Link to={`/ourShop/${subTitle}`}><button className="btn btn-outline border-0 border-b-4 mt-4 text-center">Order Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;