import { useEffect, useState } from "react";
import DynamicTitle from "../Components/DynamicTitle";
import ReactStars from "react-rating-stars-component";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    // console.log(reviews)
    return (
        <div>
            <DynamicTitle heading='---What Our Clients Say---' subHeading={'TESTIMONIALS'}></DynamicTitle>
            <div className="my-10">
                <Swiper
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >

                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center space-y-3">
                                <ReactStars
                                    value={review.rating}
                                    count={5}
                                    // onChange={}
                                    size={24}
                                    activeColor="#ffd700"
                                />,
                                <p className="text-center">{review.details}</p>
                                <h3 className="text-lg font-bold text-orange-400">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;