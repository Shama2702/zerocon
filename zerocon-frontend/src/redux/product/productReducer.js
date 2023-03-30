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
const initialState = {
    items: {
        loading: false,
        data: [],
        error: null
    },
    featureItems: {
        loading: false,
        data: [],
        error: null
    },
    newItems: {
        loading: false,
        data: [],
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_REQUEST:
            return {
                ...state,
                items: {
                    loading: true,
                    data: [],
                    error: null
                }
            }

        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                items: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }

        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                items: {
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }

        // for featured items
        case FETCH_FEATURED_ITEMS_REQUEST:
            return {
                ...state,
                featureItems: {
                    loading: true,
                    data: [],
                    error: null
                }
            }

        case FETCH_FEATURED_ITEMS_SUCCESS:
            return {
                ...state,
                featureItems: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }

        case FETCH_FEATURED_ITEMS_FAILURE:
            return {
                ...state,
                featureItems: {
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }

        // for new items / last 4 item
        case FETCH_NEW_ITEMS_REQUEST:
            return {
                ...state,
                newItems: {
                    loading: true,
                    data: [],
                    error: null
                }
            }

        case FETCH_NEW_ITEMS_SUCCESS:
            return {
                ...state,
                newItems: {
                    loading: false,
                    data: action.payload.reverse(),
                    error: null
                }
            }

        case FETCH_NEW_ITEMS_FAILURE:
            return {
                ...state,
                newItems: {
                    loading: false,
                    data: [],
                    error: action.payload
                }
            }
    
        default: return state
    }
}

export default reducer;