import { useEffect, useState } from "react";
import DynamicTitle from "../Components/DynamicTitle";
import MenuCard from "./MenuCard";

const OurMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const filteredData = data.filter(items => items.category === 'popular')
            setMenu(filteredData)
        })
    },[])
    return (
        <div>
            <div>
                <DynamicTitle subHeading='---Check it out---' heading='FROM OUR MENU'></DynamicTitle>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-11">
                {
                    menu.map(item => <MenuCard key={item._id} item={item}></MenuCard>)
                }
            </div>
        </div>
    );
};

export default OurMenu;