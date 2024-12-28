import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slider1 from '../assets/assets/home/slide1.jpg'
import slider2 from '../assets/assets/home/slide2.jpg'
import slider3 from '../assets/assets/home/slide3.jpg'
import slider4 from '../assets/assets/home/slide4.jpg'
import slider5 from '../assets/assets/home/slide5.jpg'
import DynamicTitle from '../Components/DynamicTitle';


const Slider = () => {
    return (
        <div>
            <section className='mt-11 m-9'>
                <DynamicTitle subHeading={'---From 11:00am to 10:00pm---'} heading={'ORDER ONLINE'}></DynamicTitle>
            </section>
            <Swiper
                slidesPerView={3}
                spaceBetween={60}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-20"
            >
                <SwiperSlide>
                    <img src={slider1} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider2} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider3} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider4} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slider5} alt="" />
                    <h3 className='text-white text-4xl uppercase -mt-14 text-center'>Salads</h3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;