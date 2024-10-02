import {createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; 
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [thunk];

let store;

try {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare)))
} catch (error) {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare)))

}
export {
    store
}