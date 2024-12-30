import DynamicTitle from "../Components/DynamicTitle";
import MenuCard from "./MenuCard";
import useMenu from "../Hooks/useMenu";

const OurMenu = () => {
    const [menu] = useMenu();
    const filterMenu = menu.filter(data => data.category === 'popular');

    return (
        <div>
            <div>
                <DynamicTitle subHeading='---Check it out---' heading='FROM OUR MENU'></DynamicTitle>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-11">
                {
                    filterMenu.map(item => <MenuCard key={item._id} item={item}></MenuCard>)
                }
            </div>
        </div>
    );
};

export default OurMenu;