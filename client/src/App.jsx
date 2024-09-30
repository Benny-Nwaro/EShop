import './App.css';
import { BrowserRouter as Router, Route, Routes,   } from 'react-router-dom';
import {Provider} from "react-redux";
import Navbar from './components/general/Navbar';
import Background from './components/landing/Background';
import { store } from './store';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';
import { setCurrentUser } from './actions/authActions';
// import {Dashboard} from './components/dashboard'


if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App() {
  useEffect(() => {
  store.dispatch(setCurrentUser())

  }, [])
  
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path = "/" Component={Background}/>
      <Route exact path = "/register" Component={Register}/> 
      <Route exact path = "/login" Component={LogIn}/> 
      {/* <Route exact path = "/dashboard" Component={Dashboard}/>  */}

      </Routes>
    </div>
    </Router>
    </Provider>

  );
}

export default App;