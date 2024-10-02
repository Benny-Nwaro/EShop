import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { message } from "antd";
import { login } from '../../actions/authActions';



 class LogIn extends Component {
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.errors && nextProps.errors.length > 0){
            nextProps.errors.forEach((error) =>{
              message.error(error.msg);
  
            })
          };
       if(nextProps.isAutenticated){
            message.success("Successfully logged in");
            setTimeout(() => this.props.history.push("/"), 3000); 

          };
      };

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
      }
 

      onSubmit (e){
        e.preventDefault;
        const {email, password} = this.state;
        const user = {email, password};
        this.props.login(user);
   
  
      }

  render() {
   const {email, password, } = this.state;
    return (
        <div className='container'>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fa-solid fa-user"></i> User </p>
      
        <div className="form">
            <input name='email' type = "email" placeholder = "Enter Email" value = {email} onChange = {this.onChange}/>
        </div>
        <div className="form">
            <input name='password' type = "password" placeholder = "Enter password" value = {password} onChange = {this.onChange}/>
        </div>
       
        <div className="btn btn-primary" onClick={this.onSubmit}>Submit</div>
        <p className="my-1">Don't have an account? <Link to = "/register">Register</Link></p>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});
  export default connect(mapStateToProps, {login})(LogIn);
