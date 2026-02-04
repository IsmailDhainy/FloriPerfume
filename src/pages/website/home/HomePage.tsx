import React, { useEffect } from "react";

import CheckoutModal from "$/components/shared/CheckoutModal";

import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import CategoriesSlider from "./components/CategoriesSlider";
import Features from "./components/Features";
import Products from "./components/Products";
import ProductsDynamic from "./components/ProductsDynamic";

const HomePage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/main.js";

    script.async = false;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="wrapper">
      <Carousel />
      <CategoriesSlider />
      <Products />
      <Banner />
      <Features />
      <ProductsDynamic />
      <CheckoutModal />
    </div>
  );
};

export default HomePage;
