import './App.css';
import { BrowserRouter as Router, Route, Routes   } from 'react-router-dom';
import {Provider} from "react-redux";
import { store } from './store';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';
import { setCurrentUser } from './actions/authActions';
import Landing from "./components/landing/Landing"

import Dashboard from './components/dashboard/Dashboard';

Cart

// import Products from "./components/dashboard/components/Products";
// import AddProfile from "./components/dashboard/components/AddProfile";
// import Profile from "./components/dashboard/components/Profile";
// import AddImages from "./components/dashboard/components/AddImages";

import ProtectedRoute from './components/general/ProtectedRoute';
import Home from './components/dashboard/components/Home';
import AddProduct from './components/dashboard/components/AddProduct';
import Products from './components/landing/Products';
import Profile from './components/dashboard/components/Profile';
import AddProfile from './components/dashboard/components/AddProfile';
import ProductDetails from './components/landing/ProductDetails';
import Login from './components/auth/LogIn';
import Cart from './components/customers/Cart';


if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App(props) {
  useEffect(() => {
  store.dispatch(setCurrentUser())

  }, [])
  
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Routes>
      <Route exact path = "/" Component={Landing}/>
      <Route  path="/products/:id" Component={ProductDetails} />
      <Route  path = "/register" Component={Register}/> 
      <Route  path = "/login" Component={LogIn}/> 
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard {...props} nestedRoute={Home}/>
            </ProtectedRoute>
          }
        />
      <Route
          path="/dashboard/addProduct"
          element={
            <ProtectedRoute>
                <Dashboard {...props} nestedRoute={AddProduct} />
            </ProtectedRoute>
          }
        /> 
            <Route
          path="/dashboard/products"
          element={
            <ProtectedRoute>
              <Dashboard {...props} nestedRoute={Products} />
            </ProtectedRoute>
          }
        /> 
              <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Dashboard {...props} nestedRoute={Profile} />
            </ProtectedRoute>
          }
        /> 
           <Route
          path="/dashboard/addProfile"
          element={
            <ProtectedRoute>
              <Dashboard {...props} nestedRoute={AddProfile} />
            </ProtectedRoute>
          }
        /> 
           <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          }
        /> 
      </Routes>
    </div>
    </Router>
    </Provider>

  );
}

export default App;