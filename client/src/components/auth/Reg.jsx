import React, { Component } from 'react'
import {register} from "../../actions/authActions"
import { connect } from 'react-redux';
import { message } from "antd";

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name : "",
            email : "",
            password : "",
            password2 : "",

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


      }
      UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps.auth)
        if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
          nextProps.auth.errors.forEach(error =>{
            message.error(error.msg)

          })
        }
        else if(nextProps.auth.isAutenticated){
          message.success("Successfully registered")
          setTimeout(()=>{
            // let url = window.location.search.split("/register")
            // console.log(url)

          }, 3000)
         
        }
      }
    onChange(e){
      this.setState({[e.target.name] : e.target.value})
    }
    onSubmit (){
      let role = window.location.search.split("?role=")
      role = role[role.length-1]
      console.log(role)
      
      const {name, email, password} = this.state;
      const newUser = {
        name, email, password, role,
      }
      if(this.state.password2 === password){
        this.props.register(newUser)
        
      }
      else{
        message.error("Password does not match")
      }

    }
  render() {
    const {name, email, password, password2} = this.state;
    return (
      <div className='container'>
      <div className="form-group">
        <h1 className="large text-primary">Register</h1>
        <p className="lead"><i className="fa-solid fa-user"></i> Create Account</p>
        <div className="form">
            <input name = "name" type = "text" placeholder = "Enter name" value = {name} onChange = {this.onChange}/>
        </div>
        <div className="form">
            <input name = "email" type = "email" placeholder = "Enter Email" value = {email} onChange = {this.onChange}/>
        </div>
        <div className="form">
            <input name = "password" type = "password" placeholder = "Enter password" value = {password} onChange = {this.onChange}/>
        </div>
        <div className="form">
            <input name='password2' type = "password" placeholder = "Confirm password" value = {password2} onChange = {this.onChange}/>
        </div>
        <div className="btn btn-primary" onClick={this.onSubmit}>Submit</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  auth : state.auth
})
export default connect(mapStateToProps, {register})(Register);
