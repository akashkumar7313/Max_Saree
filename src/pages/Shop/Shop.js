import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import SareeCollection from "./SareeCollection";
import SuitCollection from "./SuitCollection";
import OtherCollection from "./OtherCollection";

const ProductCard = ({ to, title, image }) => (
  <Link to={to} className="block h-[300px] w-[500px] no-underline">
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 transition transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
        <p className="text-blue-600 hover:underline">Explore {title}</p>
      </div>
    </div>
  </Link>
);

const Shop = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Shop" />
      <div className="w-full h-full flex pb-20 gap-10">
        <ProductCard to="/Shop/SareeCollection" title="Saree Collection" image="https://www.beyoung.in/blog/wp-content/uploads/2023/07/Type-of-Indian-Sarees-Banner-1024x512.jpg" />
        <ProductCard to="/Shop/SuitCollection" title="Suit Collection" image="https://ebazarninja.files.wordpress.com/2017/05/aaf004b291486cb33ac4b90fe3ca0955.jpg?w=700" />
        <ProductCard to="/Shop/OtherCollection" title="Other Collection" image="https://i.pinimg.com/736x/9d/48/ff/9d48ffbf3592696156b31fee415c681e.jpg" />
      </div>
      <Routes>
        <Route path="/Shop/SareeCollection" element={<SareeCollection />} />
        <Route path="/Shop/SuitCollection" element={<SuitCollection />} />
        <Route path="/Shop/OtherCollection" element={<OtherCollection />} />
      </Routes>
    </div>
  );
};

export default Shop;
