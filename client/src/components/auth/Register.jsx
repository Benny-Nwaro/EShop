import { register } from "../../actions/authActions";
import { connect } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from "react";

const Register = ({ auth, register }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let role = new URLSearchParams(window.location.search).get("role");

    const { name, email, password, password2 } = inputs;
    const newUser = { name, email, password, role };

    if (password === password2) {
      register(newUser);
    } else {
      message.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (auth.errors && auth.errors.length > 0) {
      auth.errors.forEach((error) => message.error(error.msg));
    } else if (localStorage.token !== undefined) {
      message.success("Successfully registered");
      setTimeout(() => navigate('/', { replace: true }), 3000); 

    }
  }, [auth]);

  return (
    <div className="container">
      <div className="form-group">
        <h1 className="large text-primary">Register</h1>
        <p className="lead">
          <i className="fa-solid fa-user"></i> Create Account
        </p>
        <form onSubmit={onSubmit}>
          <div className="form">
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <input
              name="password2"
              type="password"
              placeholder="Confirm password"
              value={inputs.password2}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);