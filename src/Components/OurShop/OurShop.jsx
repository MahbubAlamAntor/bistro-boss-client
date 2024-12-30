import Cover from "../../shared/Menu/Cover";
import ourShopImg from '../../assets/assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";

const OurShop = () => {
    const categories = ['dessert', 'pizza', 'salads', 'soups']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    console.log(category)

    const [menu] = useMenu();
    const offered = menu.filter(data => data.category === 'offered');
    const dessert = menu.filter(data => data.category === 'dessert');
    const pizza = menu.filter(data => data.category === 'pizza');
    const salad = menu.filter(data => data.category === 'salad');
    const soup = menu.filter(data => data.category === 'soup');

    return (
        <div>
            <Cover title={'OUR SHOP'} description={'Would you like to try a dish?'} img={ourShopImg}></Cover>
            <div className="">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <div className="mt-10 justify-center flex mb-1">
                            <Tab>Offered</Tab>
                            <Tab>Dessert</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Salad</Tab>
                            <Tab>Soup</Tab>
                        </div>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={offered}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;