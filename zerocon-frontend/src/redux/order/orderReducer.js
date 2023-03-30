import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAILURE,
    RESET_PLACE_ORDER_REDUCER,
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE
} from './orderType'

const initialState = {
    placeOrder: {
        loading: false,
        data: null,
        error: null
    },
    orders: {
        loading: false,
        data: [],
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return {
                ...state,
                placeOrder: {
                    loading: true,
                    data: null,
                    error: null
                }
            }

        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                placeOrder: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }

        case PLACE_ORDER_FAILURE:
            return {
                ...state,
                placeOrder: {
                    loading: false,
                    data: null,
                    error: action.payload
                }
            }

        case RESET_PLACE_ORDER_REDUCER:
            return {
                ...state,
                placeOrder: initialState.placeOrder
            }

        // fetch all orders
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                orders: {
                    loading: true,
                    data: [],
                    error: null
                }
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
        case FETCH_ORDERS_FAILURE:
            return {
                ...state,
                orders: {
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
    
        default: return state
    }
}

export default reducer