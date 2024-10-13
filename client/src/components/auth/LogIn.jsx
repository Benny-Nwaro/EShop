import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Input from "../general/Input";
import { login } from "../../actions/authActions";
import { decodeUser } from "../../utils";
import { addToCart } from "../../actions/cartActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errors = useSelector((state) => state.auth.errors);

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";
  
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((error) => message.error(error.msg));
    }
  }, [errors]);

  useEffect(() => {
    // console.log(isAuthenticated)
    if (isAuthenticated) {
      if (redirect === "/cart" && localStorage.getItem("token") && localStorage.getItem("products")) {
        const userId = decodeUser().user.id;
        const cartProducts = JSON.parse(localStorage.getItem("products"));
        const context = { products: cartProducts, userId };
        dispatch(addToCart(context));
        localStorage.removeItem("products");
      }
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, navigate, redirect, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <div className="form">
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={onChange}
        />
      </div>
      <div className="form">
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Sign In
      </button>
      <p className="my-1">
        Don't have an account? 
        <Link to={`/register?role=customer${redirect ? "&redirect=" + redirect : ""}`}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
