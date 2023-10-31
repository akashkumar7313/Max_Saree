import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellingProducts from "../../components/home/BestSellingProducts/BestSellingProducts";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Brands from "../../components/home/Brands/Brands";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Brands />
        <NewArrivals />
        <BestSellingProducts />
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
