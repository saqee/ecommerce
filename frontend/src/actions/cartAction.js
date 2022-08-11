import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants"

import axios from "axios"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  console.log(data)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeItem = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const shippingAddressAction = (info) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: info,
  })
  localStorage.setItem("shippingAddress", JSON.stringify(info))
}

export const paymentMethodAction = (info) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: info,
  })
  localStorage.setItem("paymentMethod", JSON.stringify(info))
}
