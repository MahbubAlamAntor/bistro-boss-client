import { Helmet } from "react-helmet-async";
import Cover from "./Cover";
import img1 from '../../assets/assets/menu/pizza-bg.jpg'
import dessertImg from '../../assets/assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/assets/menu/salad-bg.jpg'
import soupImg from '../../assets/assets/menu/soup-bg.jpg'
import useMenu from "../../Hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    // console.log(menu)
    const offered = menu.filter(data => data.category === 'offered');
    const dessert = menu.filter(data => data.category === 'dessert');
    const pizza = menu.filter(data => data.category === 'pizza');
    const salad = menu.filter(data => data.category === 'salad');
    // console.log(salad)
    const soup = menu.filter(data => data.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover title={'OUR MENU'} img={img1} description='Would you like to try a dish?'></Cover>

            <div className="container mx-auto">
                {/* offer card show with img */}
                <div className="mt-14">
                    <MenuCategory items={offered} title={`TODAY'S OFFER`} description={`---Don't miss---`}></MenuCategory>
                </div>

                {/* dessert card show with img */}
                <div className="mt-16">
                    <MenuCategory items={dessert} subTitle={'dessert'} img1={dessertImg} subDescription={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}></MenuCategory>
                </div>

                {/* pizza card show with img */}
                <div className="mt-16">
                    <MenuCategory items={pizza} subTitle={'pizza'} img1={pizzaImg} subDescription={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}></MenuCategory>
                </div>

                {/* SALADS card show with img */}
                <div className="mt-16">
                    <MenuCategory items={salad} subTitle={'salads'} img1={saladImg} subDescription={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}></MenuCategory>
                </div>

                {/* SOUPS card show with img */}
                <div className="mt-16 mb-10">
                    <MenuCategory items={soup} subTitle={'soups'} img1={soupImg} subDescription={`Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}></MenuCategory>
                </div>
            </div>
        </div>
    );
};

export default Menu;