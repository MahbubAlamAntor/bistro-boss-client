import DynamicTitle from "../Components/DynamicTitle";
import featured from '../assets/assets/home/featured.jpg';
import './featured.css'

const Feautured = () => {
    return (
        <div className="featuredImage bg-fixed" >
            <div className="mb-10 p-20 ">
                <div>
                    <DynamicTitle subHeading='---Check it out---' heading='FROM OUR MENU'></DynamicTitle>
                </div>
                <div className="flex bg-slate-500 justify-center items-center mt-8">
                    <div>
                        <img className="rounded-xl" src={featured} alt="" />
                    </div>
                    <div className="space-y-3 text-white ml-11">
                        <p>March 20, 2023</p>
                        <h3>WHERE CAN I GET SOME?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="btn text-lg font-bold btn-outline btn-success border-0 border-b-4">Success</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feautured;