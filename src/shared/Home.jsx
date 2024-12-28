import Banner from "./Banner";
import Feautured from "./Feautured";
import OurMenu from "./OurMenu";
import Slider from "./Slider";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Slider></Slider>
            <OurMenu></OurMenu>
            <Feautured></Feautured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;