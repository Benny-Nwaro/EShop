import React from 'react'
import Products from "./Products";
import Background from "./Background";
import Navbar from "../general/Navbar";

export default function Nav() {
  return (
    <div>
    <Navbar />
    <Background />
    <Products />
    </div>
  )
}
