import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { default as firebase } from "../../../db/firebase";

const SpecialOffers = () => {
  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, 
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]); // Declare products state

  const fetchProducts = useCallback(() => {
    const productsRef = firebase.database().ref("SpecialOffers");

    productsRef.on("value", (snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        products.push({
          id: childSnapshot.key,
          img: product.img,
          productName: product.productName,
          price: product.price,
          color: product.color,
          description: product.description,
        });
      });
      setProducts(products);
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="w-full pb-16">
      <Heading heading="Special Offers" />
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <Product
              _id={product.id}
              img={product.img}
              productName={product.productName}
              price={product.price}
              color={product.color}
              badge={true}
              des={product.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialOffers;
