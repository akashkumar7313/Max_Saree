import React, { useState, useEffect, useCallback } from "react";
import { default as firebase } from '../../db/firebase';
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";

const Saree = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(""); // To display the selected image name
  const [caption, setCaption] = useState(""); // To store the image caption

  const fetchImages = useCallback(() => {
    const imagesRef = firebase.database().ref("images");

    imagesRef.on("value", (snapshot) => {
      const images = [];
      snapshot.forEach((childSnapshot) => {
        const image = childSnapshot.val();
        images.push({
          id: childSnapshot.key,
          url: image.url,
          name: image.name,
          caption: image.caption, // Retrieve image caption from the database
        });
      });
      setImageData(images);
    });
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setSelectedImageName(file.name);
  };

  const handleImageDelete = (imageId) => {
    // First, remove the image data from the Realtime Database
    firebase
      .database()
      .ref(`images/${imageId}`)
      .once("value")
      .then((snapshot) => {
        const image = snapshot.val();
        if (image) {
          const storageRef = firebase.storage().refFromURL(image.url);
          storageRef
            .delete()
            .then(() => {
              firebase.database().ref(`images/${imageId}`).remove();
              alert("Image deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting image from Firebase Storage:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error retrieving image data from Firebase Database:", error);
      });
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setSelectedImageName(image.name);
    setCaption(image.caption); // Set the caption in the input field
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSaveImageWithCaption = () => {
    if (selectedImage && caption) {
      setUploading(true);
      const storageRef = firebase.storage().ref(`images/${selectedImage.name}`);
      const uploadTask = storageRef.put(selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            firebase.database().ref("images").push({
              url: downloadURL,
              name: selectedImage.name,
              caption: caption,
            });

            setSelectedImage(null);
            setSelectedImageName("");
            setCaption(""); // Clear the caption field
            setUploading(false);
          });
        }
      );
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
            <input
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={handleCaptionChange}
              className="p-2 mb-4 mx-10 w-[300px] rounded cursor-pointer"
            />
            <button
              onClick={handleSaveImageWithCaption}
              className="p-2 bg-green-500 mb-14 text-white rounded cursor-pointer"
              disabled={!selectedImage || !caption || uploading}
            >
              Save Image with Caption
            </button>
          </div>
          <h2 className="text-black flex justify-center pt-4 mb-5 text-3xl font-bold ">
            Uploaded imageData List
          </h2>
          <div className="flex flex-wrap justify-center border border-cyan-900 rounded-[10px] bg-slate-400">
            {imageData.map((image) => (
              <div
                key={image.id}
                className="m-4 h-auto w-[210px] border border-pink-500 rounded-[10px] bg-pink-100"
              >
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="rounded-t-[10px] h-auto cursor-pointer"
                  onClick={() => handleImageSelect(image)}
                />
                <div className="flex justify-center">
                  <div className="text-black mb-2 mx-10">Caption: {image.caption}</div>
                </div>
                <div className="flex justify-center">
                 <button
                    className="flex text-red-700 mt-5 w-28 hover:text-white border border-red-800 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-3 py-2 justify- mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => handleImageDelete(image.id)}
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
