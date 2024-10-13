import React from "react";
import Products from "./Products";
import Background from "./Background";
import Navbar from "../general/Navbar";


const index = () => {
  let x = location.pathname
  console.log(x)
  return (
    <div>
      <Navbar />
       <Background/>
      <Products />
    </div>
  );
};

export default index;
