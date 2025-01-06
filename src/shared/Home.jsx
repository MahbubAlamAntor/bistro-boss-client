import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Feautured from "./Feautured";
import OurMenu from "./OurMenu";
import Slider from "./Slider";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <div className="max-w-7xl mx-auto">
                <Slider></Slider>
                <OurMenu></OurMenu>
                <Feautured></Feautured>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;