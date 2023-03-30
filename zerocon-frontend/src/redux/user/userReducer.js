import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE
} from './userType';
const initialState = {
    me: {
        loading: true,
        data: null,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                me: {
                    ...state.me,
                    loading: true
                }
            }
            
        case AUTH_SUCCESS:
            return {
                me: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            }
            
        case AUTH_FAILURE:
            return {
                me: {
                    loading: false,
                    data: null,
                    error: action.payload
                }
            }
            
        default: return state
    }
}

export default reducer