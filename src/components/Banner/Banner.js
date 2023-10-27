import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import bannerImgOne from "../../assets/images/banner/banarasi-sarees-a-must-have-in-wedding-trousseau.jpg";
import bannerImgTwo from "../../assets/images/banner/Kanjivaram-Silk-Sarees-Banner.png";
import bannerImgThree from "../../assets/images/banner/1567074283.jpg";
import bannerImgFour from "../../assets/images/banner/fe53322d-7590-4865-b69d-425940796551.webp";
import bannerImgFive from "../../assets/images/banner/saree_banner.jpg";
import bannerImgSix from "../../assets/images/banner/banner2.jpg";
import Image from "../designLayouts/Image";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgOne} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgTwo} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgThree} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgFour} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgFive} />
          </div>
        </Link>
        <Link to="/offer">
          <div>
            <Image imgSrc={bannerImgSix} />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Banner;
