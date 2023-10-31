import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { default as firebase } from "../../../db/firebase";

function Items({ currentItems }) {
  return (
    <>
      {currentItems.map((product) => (
        <div key={product.id} className="w-full">
          <Product
            _id={product.id}
            img={product.img}
            productName={product.productName}
            price={product.price}
            color={product.color}
            des={product.description}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const endOffset = itemOffset + itemsPerPage;

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

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base text-black font-semibold">
          Products from {itemStart} to {endOffset} of {products.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
