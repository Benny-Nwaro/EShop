import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { message } from "antd";
import { login } from '../../actions/authActions';
import { useEffect, useState } from 'react';




 function LogIn({ auth, login }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      };
 

      const onSubmit = (e) => {
        e.preventDefault();
        
        const {email, password } = inputs;
        const user = {email, password };
        login(user)}
    
    
      useEffect(() => {
        if (auth.errors && auth.errors.length > 0) {
          auth.errors.forEach((error) => message.error(error.msg));
        } else if (localStorage.token) {
            message.success("Successfully logged in");
            setTimeout(() => this.props.history.push("/"), 3000); 
        }
      }, [auth]);

    return (
      <div className="container">
      <div className="form-group">
        <h1 className="large text-primary">Log In</h1>
        <p className="lead">
          <i className="fa-solid fa-user"></i> User
        </p>
        <form onSubmit={onSubmit}>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    )
  }

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});
  export default connect(mapStateToProps, {login})(LogIn);
