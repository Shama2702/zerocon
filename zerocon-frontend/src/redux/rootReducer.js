import { combineReducers } from 'redux';
import productReducer from './product/productReducer';
import cartReducer from './cart/cartReducer';
import userReducer from './user/userReducer';
import orderReducer from './order/orderReducer';

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
})

export default rootReducer