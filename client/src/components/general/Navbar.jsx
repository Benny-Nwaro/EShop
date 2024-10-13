import React from 'react'
import { connect } from 'react-redux'
import {Link } from "react-router-dom"
import { logout } from '../../actions/authActions'


const Navbar = ({auth, logout})=> {
  const guest = (
    <ul>
    <li>
      <Link to = "/register?role=merchant">Merchants</Link>
    </li>
    <li>
    <Link to ="/register?role=customer">Register</Link>
    </li>
    <li>
    <Link to ="/login">Login</Link>
    </li>
  </ul>
  )
  const user = (
    <ul>
    <li>
      <Link to = "/dashboard">Dashboard</Link>
    </li>
   
    <li>
    <Link to ="/" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i><span className='hide-on-mobile'>Logout</span></Link>
    </li>
  </ul>
  )
  return (
    <nav className='main-navbar  bg-main'>
      <h1>
        <Link to="">
        <i className='fas fa-store'></i>e-Shop
        </Link>
      </h1>
      {auth.token !== null ? user : guest}
  
    </nav>
  )
}
const mapStateToProps = (state)=>({
  auth : state.auth
})
export default connect(mapStateToProps, {logout})(Navbar);
