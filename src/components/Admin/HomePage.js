import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { FcAddImage, FcBusinessman, FcBusinesswoman, FcCurrencyExchange, FcDebian, FcDebt, FcEditImage, FcHome } from "react-icons/fc";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { default as firebase } from '../../db/firebase';

export default function HomePage() {
  const [logoutLoading, setLogoutLoading] = useState(false); // Fix the typo here
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is not logged in, you can redirect them to the login page
        // Example: window.location.href = '/login';
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await firebase.auth().signOut(); // Use Firebase Auth signOut method
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLogoutLoading(false);
    }
  }



  return (
    <div
      className="bg-cover bg-center h-screen flex "
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1698414675352-8954e00c8553?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <Card className="h-[calc(100vh)] w-[20%] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt="brand" style={{ width: '150px' }} />
        </div>
        <hr className="my-2 border-blue-gray-50" />
        <List>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Home"
                activeClassName="text-blue-500"
                className="border-b-0 p-3 flex items-center"
              >
                <FcHome className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal">
                  Home
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/Banner"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcAddImage className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal">
                  Banner
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/Brands"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcDebian className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal">
                  Brands
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/NewArrivals"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcEditImage className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  New Arrivals
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/BestSellingProducts"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcCurrencyExchange className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  Best Selling Products
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/SpecialOffers"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcDebt className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  Special Offers
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/SpecialOffers"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcBusinesswoman className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  Saree
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/SpecialOffers"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcBusinesswoman className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  Suit
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <Accordion>
            <ListItem className="p-0 flex items-center hover:bg-red-800 hover:text-white border">
              <NavLink
                to="/Admin/SpecialOffers"
                activeClassName="text-blue-500" // Add the desired active class name
                className="border-b-0 p-3 flex items-center"
              >
                <FcBusinessman className="h-5 w-5 mr-2" />
                <Typography color="blue-gray" className="font-normal ">
                  Other Cloth
                </Typography>
              </NavLink>
            </ListItem>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem
            className=" flex text-red-700 mt-[60px] hover:text-white border border-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => handleLogout()}
          >
            <PowerIcon className="h-5 w-5 mr-2" />
            Logout
          </ListItem>
        </List>
      </Card>
      <div className="w-[80%] pt-60 text-5xl">
        <div className="">
          {user ? (
            <div className="text-white grid justify-center text-[55px] items-center">
              <h1 className="font-extrabold">Hello, <span className="  text-orange-600 font-extrabold text-[75px]"> {user.displayName}{" "}! </span>How are you?</h1>
              <span className=" text-orange-600 font-extrabold text-[55px] flex justify-end mt-4">{user.email}</span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
