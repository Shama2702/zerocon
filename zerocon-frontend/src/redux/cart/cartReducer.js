import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    SET_PREV_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY
} from './cartType'
import cookie from 'react-cookies';

const initialState = {
    products: []
}

const reducer = (state = initialState, action) => {
    var newProduct = [];
    switch (action.type) {
        case SET_PREV_CART:
            return {
                products: action.payload,
            }

        case ADD_PRODUCT:
            newProduct = [...state.products, action.payload];
            updateCartCookie(newProduct);
            return {
                products: newProduct,
            }

        case REMOVE_PRODUCT:
            newProduct = state.products.filter(product => product.id !== action.payload);
            updateCartCookie(newProduct);
            return {
                products: newProduct 
            }

        case INCREASE_QUANTITY:
            newProduct = [];
            state.products.forEach(product => {
                if (product.id === action.payload) {
                    product.quantity += 1;
                }
                if (product.quantity <= 20) {
                    newProduct.push(product);
                }
            });
            updateCartCookie(newProduct);
            return {
                products: newProduct
            }

        case DECREASE_QUANTITY:
            newProduct = [];
            state.products.forEach(product => {
                if (product.id === action.payload) {
                    product.quantity -= 1;
                }
                if (product.quantity) {
                    newProduct.push(product);
                }
            });
            updateCartCookie(newProduct);
            return {
                products: newProduct
            }

        default: return state
    }
}

const updateCartCookie = (products) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    cookie.save('cart', products, { path: '/', expires });
    // console.log(products);
}

export default reducer