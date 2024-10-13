import { getServer } from "../utils";
import { GET_CART, ERRORS } from "./types";
import axios from "axios";

export const addToCart = (context) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .post(`${getServer()}/api/cart`, context, config)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err,
      });
    });
};

export const getCart = () => async (dispatch) => {
  await axios
    .get(`${getServer()}/api/cart`)
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err,
      })
    );
};

export const removeFromCart = (context) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { id } = context;
  return await axios
    .put(`${getServer()}/api/cart/${id}`, context, config)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ERRORS,
        payload: err,
      })
    );
};
