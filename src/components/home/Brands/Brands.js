import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";
import { storage } from '../../../db/firebase';
import Heading from "../Products/Heading";
import Slider from "react-slick";

const Brands = () => {
  const [images, setImages] = useState([]);
  const [dotActive, setDocActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
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

  useEffect(() => {
    async function fetchImages() {
      const imageUrls = [];
      const storageRef = storage.ref('Brands'); // Replace 'images' with your storage folder name

      try {
        const imageList = await storageRef.listAll();

        for (const imageItem of imageList.items) {
          const url = await imageItem.getDownloadURL();
          imageUrls.push(url);
        }

        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="pt-5 pb-5">
      <Heading heading="Brands" />
      <div className="w-full">
        <Slider {...settings}>
          {images.map((imgSrc, index) => (
            <Link to="/shop" key={index}>
              <div className="pl-5">
                <Image imgSrc={imgSrc}  />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brands;
