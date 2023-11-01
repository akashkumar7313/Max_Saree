import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Brands from "./components/Admin/Brands";
import Login from "./components/Admin/Login";
import HomePage from "./components/Admin/HomePage";
import Banner from "./components/Admin/Banner";
import NewArrivals from "./components/Admin/NewArrivals";
import BestSellingProducts from "./components/Admin/BestSellingProducts";
import SpecialOffers from "./components/Admin/SpecialOffers";
import SareeCollection from "./pages/Shop/SareeCollection";
import SuitCollection from "./pages/Shop/SuitCollection";
import OtherCollection from "./pages/Shop/OtherCollection";
import SareeCollections from "./components/Admin/SareeCollections";
import SuitCollections from "./components/Admin/SuitCollections";
import OtherCollections from "./components/Admin/OtherCollections";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/Shop/SareeCollection" element={<SareeCollection />}></Route>
        <Route path="/Shop/SuitCollection" element={<SuitCollection />}></Route>
        <Route path="/Shop/OtherCollection" element={<OtherCollection />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/Admin" element={<Login />}></Route>
      <Route path="/Home" element={<HomePage />}></Route>
      <Route path="/Admin/Banner" element={<Banner />}></Route>
      <Route path="/Admin/NewArrivals" element={<NewArrivals />}></Route>
      <Route path="/Admin/Brands" element={<Brands />}></Route>
      <Route path="/Admin/BestSellingProducts" element={<BestSellingProducts />}></Route>
      <Route path="/Admin/SpecialOffers" element={<SpecialOffers />}></Route>
      <Route path="/Admin/SareeCollections" element={<SareeCollections />}></Route>
      <Route path="/Admin/SuitCollections" element={<SuitCollections />}></Route>
      <Route path="/Admin/OtherCollections" element={<OtherCollections />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
