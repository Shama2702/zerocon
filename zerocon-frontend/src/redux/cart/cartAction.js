import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    SET_PREV_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY
 } from './cartType'

 export const addProduct = (product) => {
     return {
         type: ADD_PRODUCT,
         payload: product
     }
 }
 export const removeProduct = (id) => {
     return {
         type: REMOVE_PRODUCT,
         payload: id
     }
 }

 export const setPrevCart = (cart) => {
    return {
        type: SET_PREV_CART,
        payload: cart
    }
 }

//  increase and decrease quantity
export const increaseQuantity = (id) => {
    return {
        type: INCREASE_QUANTITY,
        payload: id
    }
}
export const decreaseQuantity = (id) => {
    return {
        type: DECREASE_QUANTITY,
        payload: id
    }
}