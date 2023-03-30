import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE
} from './userType';
import {
    rootUrl,
    fetchOrders
} from './../index'
import axios from 'axios';
import Toast from 'light-toast';
import cookie from 'react-cookies';

// auth
const authRequest = () => {
    return {
        type: AUTH_REQUEST
    }
}
const authSuccess = (data) => {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}
const authFailure = (error) => {
    return {
        type: AUTH_FAILURE,
        payload: error
    }
}
export const login = (data) => {
    data = JSON.stringify(data);
    return dispatch => {
        Toast.loading("Login...");

        dispatch(authRequest());
        axios.post(`${rootUrl}/user/signin`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                // console.log(res.data);
                setTimeout(() => {
                    Toast.hide();
                }, 500);
                setTimeout(() => {
                    Toast.success(res.data.msg);

                    const expires = new Date();
                    expires.setDate(expires.getDate() + 7);
                    cookie.save('token', res.data.data.token, { path: '/', expires });

                    window.location.reload();
                }, 1000);
                // dispatch(auth(res.data.data.token));
            })
            .catch(err => {
                try {
                    dispatch(authFailure(err.response.data));

                    setTimeout(() => {
                        Toast.hide();
                    }, 500);
                    setTimeout(() => {
                        Toast.fail(err.response.data.error);
                    }, 1000);
                } catch (error) {

                }
            })
    }
}

export const auth = (token) => {
    return dispatch => {
        axios.get(`${rootUrl}/user/auth`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                // console.log(res);
                dispatch(authSuccess(res.data.data));
                dispatch(fetchOrders());
            })
            .catch(err => {
                // console.log(err);
                try {
                    dispatch(authFailure(err.response.data))
                } catch (error) {

                }
            })
    }
}

export const registration = (data) => {
    var jsonData = JSON.stringify(data);
    return dispatch => {
        Toast.loading("Loading...");

        axios.post(`${rootUrl}/user/signup`, jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setTimeout(() => {
                    Toast.hide();
                }, 500);
                setTimeout(() => {
                    Toast.success("Registration Success, Please login and verify your contact number");
                }, 1000);
                setTimeout(() => {
                    dispatch(login({
                        contact_number: data.contact_number,
                        password: data.password
                    }))
                }, 1500);
            })
            .catch(err => {
                setTimeout(() => {
                    Toast.hide();
                }, 500);
                setTimeout(() => {
                    try {
                        Toast.fail(err.response.data.error);
                    } catch (error) {
                        Toast.fail("Registration Fail");
                    }

                }, 1000);
            })

    }
}