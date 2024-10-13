import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";


export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  profile: profileReducer,
  cart: cartReducer,
});
