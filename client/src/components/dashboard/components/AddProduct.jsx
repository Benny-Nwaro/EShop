import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Input from "../../general/Input";
import { addProduct } from "../../../actions/productAction";


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
    category: "",
  });

  const { name, description, price, brand, quantity, category } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (name.length <= 0) {
      return message.error("Name field is required");
    }
    if (description.length <= 0) {
      return message.error("Description field is required");
    }

    const newProduct = { name, description, price, brand, quantity, category };
    console.log(newProduct);
    dispatch(addProduct(newProduct, navigate));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Name of product"
        name="name"
        value={name}
        onChange={onChange}
        style={{ width: "360px", height: "35px" }}
      />
      <input
        type="text"
        placeholder="Give a brief description of product"
        name="description"
        value={description}
        onChange={onChange}
        style={{ width: "360px", height: "35px" }}
      />
      <input
        type="number"
        placeholder="Enter the price of this product"
        name="price"
        value={price}
        onChange={onChange}
        style={{ width: "360px", height: "35px" }}
      />
      <input
        type="text"
        placeholder="Enter the brand of this product"
        name="brand"
        value={brand}
        onChange={onChange}
        style={{ width: "360px", height: "35px" }}
      />
      <input
        type="number"
        placeholder="Enter quantity"
        name="quantity"
        value={quantity}
        onChange={onChange}
        style={{ width: "360px", height: "35px" }}
      />
      <div className="form-group">
        <select
          style={{ width: "360px", height: "35px" }}
          name="category"
          value={category}
          onChange={onChange}
        >
          <option value="0">Select a category for this product</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Office Supply">Office Supply</option>
          <option value="Automotive Supply">Automotive Supply</option>
          <option value="Cosmetics">Cosmetics</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
