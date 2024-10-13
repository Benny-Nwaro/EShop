import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";
import { getProducts } from "../../actions/productAction";
import Product from "../general/Product";

const { Meta } = Card;

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  const productDetails = (product) => (
    <ul>
      <li>${product.price}</li>
      <li>Quantity: {product.quantity}</li>
    </ul>
  );

  return (
    <div className="container-flex">
      <div className="row">
        {products.map((product, index) => (
          <Product
            key={index}
            link={`products/${product._id}`}
            product={product}
            description={productDetails(product)}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
