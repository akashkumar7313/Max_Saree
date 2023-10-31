import React, { useState, useEffect, useCallback } from "react";
import { default as firebase } from "../../db/firebase";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";

const Saree = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const fetchProducts = useCallback(() => {
    const productsRef = firebase.database().ref("BestSellingProducts");

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
    fetchProducts(); // Use fetchProducts instead of fetchImages
  }, [fetchProducts]);

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setSelectedImageName(file.name);
  };


  const handleSaveProduct = () => {
    if (selectedImage && productName && productPrice && productColor && productDescription) {
      setUploading(true);
      const storageRef = firebase.storage().ref(`BestSellingProducts/${selectedImage.name}`);
      const uploadTask = storageRef.put(selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            firebase.database().ref("BestSellingProducts").push({
              img: downloadURL,
              productName: productName,
              price: productPrice,
              color: productColor,
              description: productDescription,
            });

            setSelectedImage(null);
            setSelectedImageName("");
            setProductName("");
            setProductPrice("");
            setProductColor("");
            setProductDescription("");
            setUploading(false);
          });
        }
      );
    }
  };


  const handleImageDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Confirm the delete action with a user prompt
  
      // Remove the product from Firebase
      const productRef = firebase.database().ref(`BestSellingProducts/${productId}`);
      const imageRef = firebase.database().ref(`BestSellingProducts`).orderByChild("img").equalTo(products.find(product => product.id === productId).img);
  
      productRef.remove()
        .then(() => {
          imageRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              imageRef.child(key).remove(); // Remove the corresponding image
            });
          });
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <div className="">
      <div className="p-3">
        <Breadcrumbs className="flex justify-end px-4 text-white">
          <NavLink
            to="/Home"
            className="text-[16px] font-semibold leading-10 text-black hover:text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/Students/Offer"
            className="text-[18px] font-semibold leading-10 text-white hover:text-black"
          >
            Students Offer
          </NavLink>
        </Breadcrumbs>
        <div className="flex flex-col items-center rounded-[10px]">
          <div className="bg-red-200 h-auto w-full flex flex-col items-center border border-cyan-950 rounded-[10px]">
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <button
              onClick={() => {
                const fileInput = document.getElementById("fileInput");
                fileInput.click();
              }}
              className="mb-4 px-3 py-2 mt-10 bg-blue-500 text-white rounded cursor-pointer"
            >
              Select Image
            </button>
            {selectedImage && (
              <div className="">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-44 h-auto mb-2 mx-28"
                />
                <p className="text-black mb-2 mx-10">Selected Image: {selectedImageName}</p>
              </div>
            )}
            {uploading && <p className="text-black mb-4">Uploading...</p>}
            <div className="flex items-center">
              <label htmlFor="productName" className="block mb-4">
                Product Name:
              </label>
              <input
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="p-2 mb-4 mx-2 w-[300px] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center"> 
              <label htmlFor="productPrice" className="block mb-4">
                Product Price:
              </label>
              <input
                type="number"
                placeholder="Enter Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="p-2 mb-4 mx-2 w-[300px] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center"> 
              <label htmlFor="productColor" className="block mb-4">
                Product Color:
              </label>
              <input
                type="text"
                placeholder="Enter Product Color"
                value={productColor}
                onChange={(e) => setProductColor(e.target.value)}
                className="p-2 mb-4 mx-2 w-[300px] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="productDescription" className="block mb-4">
                Product Description:
              </label>
              <input
                type="text"
                id="productDescription"
                placeholder="Enter Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="p-2 mb-4 mx-2 w-[300px] rounded cursor-pointer"
              />
            </div>
            <button
              onClick={handleSaveProduct}
              className="p-2 bg-green-500 mb-14 text-white rounded cursor-pointer"
              disabled={!selectedImage || !productName || !productPrice || !productColor || !productDescription || uploading}
            >
              Upload Product
            </button>
          </div>

          <h2 className="text-black flex justify-center pt-4 mb-5 text-3xl font-bold">
            Product List
          </h2>
          <div className="flex flex-wrap justify-center border border-cyan-900 rounded-[10px] bg-slate-400">
            {products.map((product) => (
              <div
                key={product.id}
                className="m-4 h-auto w-[210px] border border-pink-500 rounded-[10px] bg-pink-100"
              >
                <img
                  src={product.img}
                  alt={product.productName}
                  className="rounded-t-[10px] h-auto cursor-pointer"
                />
                <div className="flex justify-center">
                  <div className="text-black mb-2 mx-10">
                    Product Name: {product.productName}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="text-black mb-2 mx-10">
                    Product Price: {product.price}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="text-black mb-2 mx-10">
                    Product Color: {product.color}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="text-black mb-2 mx-10">
                    Product Description: {product.description}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="flex text-red-700 mt-5 w-28 hover:text-white border border-red-800 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-3 py-2 justify- mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => handleImageDelete(product.id)}
                  >
                    <MdDeleteForever className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saree;
