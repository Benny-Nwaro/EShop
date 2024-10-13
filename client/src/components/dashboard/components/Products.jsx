import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorProducts } from "../../../actions/productAction";
import Product from "../../general/Product";
import { decodeUser } from "../.././../utils";

const Products = () => {
  const [merchantProducts, setMerchantProducts] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Fetch products on mount
  useEffect(() => {
    const userId = decodeUser().user.id;
    dispatch(getInstructorProducts(userId));
  }, [dispatch]);

  // Update merchant products when products in state changes
  useEffect(() => {
    if (products?.products?.length > 0) {
      setMerchantProducts(products.products);
    }
  }, [products]);

  // Function to display product details
  const productDetails = (product) => (
    <ul>
      <li>${product.price}</li>
      <li>Quantity: {product.quantity}</li>
    </ul>
  );

  return (      
<div className="container">
  <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
  {merchantProducts.map((product, index) => (
        <Product
          key={index}
          product={product}
          description={productDetails(product)}
          // uploadImages={`/dashboard/products/${product._id}/addImages`}
          thumbnail={product.thumbnail}
          showBtn={true}
        />
      ))}

  </div>
</div>
  );
};

export default Products;
