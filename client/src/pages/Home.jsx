import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  const productsRef = useRef(null);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider productsRef={productsRef} />
      <Categories />
      <div ref={productsRef}>
        <Products />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
