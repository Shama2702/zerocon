import {
    FETCH_ITEMS_REQUEST,
    FETCH_ITEMS_SUCCESS,
    FETCH_ITEMS_FAILURE,

    FETCH_FEATURED_ITEMS_REQUEST,
    FETCH_FEATURED_ITEMS_SUCCESS,
    FETCH_FEATURED_ITEMS_FAILURE,

    FETCH_NEW_ITEMS_REQUEST,
    FETCH_NEW_ITEMS_SUCCESS,
    FETCH_NEW_ITEMS_FAILURE
} from './productType';
import { rootUrl } from "./../";
import axios from "axios";

//fetching all items
const fetchItemRequest = () => {
    return {
        type: FETCH_ITEMS_REQUEST
    }
}
const fetchItemSuccess = (data) => {
    return {
        type: FETCH_ITEMS_SUCCESS,
        payload: data
    }
}
const fetchItemFailure = (error) => {
    return {
        type: FETCH_ITEMS_FAILURE,
        payload: error
    }
}
export const fetchItem = () => {
    return dispatch => {
        dispatch(fetchItemRequest());
        axios.get(`${rootUrl}/items`)
        .then(response => {
            // console.log(response.data);
            dispatch(fetchItemSuccess(response.data.data));
        })
        .catch( err => {
            console.log(err);
            dispatch(fetchItemFailure(err));
        })
    }
}



//fetching featured items
const fetchFeaturedItemRequest = () => {
    return {
        type: FETCH_FEATURED_ITEMS_REQUEST
    }
}
const fetchFeaturedItemSuccess = (data) => {
    return {
        type: FETCH_FEATURED_ITEMS_SUCCESS,
        payload: data
    }
}
const fetchFeaturedItemFailure = (error) => {
    return {
        type: FETCH_FEATURED_ITEMS_FAILURE,
        payload: error
    }
}
export const fetchFeaturedItem = () => {
    return dispatch => {
        dispatch(fetchFeaturedItemRequest());
        axios.get(`${rootUrl}/items/featured/items`)
        .then(response => {
            // console.log(response.data);
            dispatch(fetchFeaturedItemSuccess(response.data.data));
        })
        .catch( err => {
            console.log(err);
            try {
                dispatch(fetchFeaturedItemFailure(err.response.data));
            } catch (error) {
                
            }
            
        })
    }
}


//fetching new items / last 4 items
const fetchNewItemRequest = () => {
    return {
        type: FETCH_NEW_ITEMS_REQUEST
    }
}
const fetchNewItemSuccess = (data) => {
    return {
        type: FETCH_NEW_ITEMS_SUCCESS,
        payload: data
    }
}
const fetchNewItemFailure = (error) => {
    return {
        type: FETCH_NEW_ITEMS_FAILURE,
        payload: error
    }
}
export const fetchNewItem = () => {
    return dispatch => {
        dispatch(fetchNewItemRequest());
        axios.get(`${rootUrl}/items/new`)
        .then(response => {
            // console.log(response.data);
            dispatch(fetchNewItemSuccess(response.data.data));
        })
        .catch( err => {
            console.log(err);
            try {
                dispatch(fetchNewItemFailure(err.response.data));
            } catch (error) {
                
            }
            
        })
    }
}
