import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILURE,
    RESET_PLACE_ORDER_REDUCER,
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE
} from './orderType'

import {
    rootUrl
} from './../index'
import axios from 'axios'
import cookie from 'react-cookies'

// place order
const placeOrderRequest = () => {
    return {
        type: PLACE_ORDER_REQUEST
    }
}
const placeOrderSuccess = (data) => {
    return {
        type: PLACE_ORDER_SUCCESS,
        payload: data
    }
}
const placeOrderFailure = (err) => {
    return {
        type: PLACE_ORDER_FAILURE,
        payload: err
    }
}
export const placeOrderReset = () => {
    return {
        type: RESET_PLACE_ORDER_REDUCER
    }
}

export const placeOrder = (data) => {
    data = JSON.stringify(data);
    const token = cookie.load('token')
    return dispatch => {
        dispatch(placeOrderRequest());
        axios.post(`${rootUrl}/order`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                // console.log(res.data);
                dispatch(placeOrderSuccess(res.data));
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch(placeOrderFailure(err.response.data));
            })
    }
}

// fetch all orders
const fetchOrdersRequest = () => {
    return {
        type: FETCH_ORDERS_REQUEST
    }
}
const fetchOrdersSuccess = (data) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: data
    }
}
const fetchOrdersFailure = (err) => {
    return {
        type: FETCH_ORDERS_FAILURE,
        payload: err
    }
}

export const fetchOrders = () => {
    const token = cookie.load('token')
    return dispatch => {
        dispatch(fetchOrdersRequest())
        axios.get(`${rootUrl}/order`, {
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        .then(res => {
            dispatch(fetchOrdersSuccess(res.data.data))
        })
        .catch(err => {
            dispatch(fetchOrdersFailure(err.response.data))
        })
    }
}