import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CustomSlide extends Component {
    render() {
        const { index, ...props } = this.props;
        return (
            <div {...props}>
                <h3>{index}</h3>
            </div>
        );
    }
}

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        return (
            <div className="w-[100%] truncate h-full">
                <Slider {...settings}>
                    <div className="w-[100%]">
                        {/* <CustomSlide /> */}
                        <img
                            className="w-[100%] h-[100%]"
                            src="https://theme.hstatic.net/200000411281/1000949882/14/home_slider_image_2.jpg?v=260"
                            alt=""
                        />
                    </div>
                    {/* <div>
                         <CustomSlide /> 
                         <img
                            className="w-[100%] h-[100%]"
                            src="https://theme.hstatic.net/200000411281/1000949882/14/home_slider_image_4.jpg?v=260"
                            alt=""
                        /> 
                    </div> */}
                </Slider>
            </div>
        );
    }
}
