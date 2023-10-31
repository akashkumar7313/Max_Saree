import React, { useState, useEffect, useCallback } from "react";
import { default as firebase } from "../../../db/firebase";

const ProductsOnSale = () => {
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

  // Get the first four products
  const firstFourProducts = products.slice(0, 4);

  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2">
        {firstFourProducts.map((product) => (
          <div
            key={product.id} // Change from product._id to product.id
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
          >
            <div>
              <img className="w-24" src={product.img} alt={product.img} />
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{product.productName}</p>
              <p className="text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
