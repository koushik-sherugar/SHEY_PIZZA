import axios from 'axios';
import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_SUCCESS,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
} from '../constants/orderConstants';

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });

  const currentUser = getState().auth.user;
  const cartItems = getState().cart.cartItems;

  try {
    const res = await axios.post('/api/orders/placeorder', {
      token,
      subtotal,
      currentUser,
      cartItems,
    });

    dispatch({ type: PLACE_ORDER_SUCCESS });
    console.log(res);
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAILED });
    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const user = getState().auth.user;

  dispatch({ type: GET_USER_ORDERS_REQUEST });

  try {
    const { data } = await axios.post('/api/orders/getuserorders', {
      userid: user._id,
    });

    dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_ORDERS_FAIL, payload: error });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });

  try {
    const { data } = await axios.get('/api/orders/getallorders');

    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAIL, payload: error });
  }
};

export const deliverOrder = (orderid) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/orders/deliverorder', { orderid });

    console.log(data);

    alert('Order Delivered');

    const orders = await axios.get('/api/orders/getallorders');
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders.data });

    // window.location.reload();
  } catch (error) {
    console.log(error);

    alert('Something went Wrong!!');
  }
};
