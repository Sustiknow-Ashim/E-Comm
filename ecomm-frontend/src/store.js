import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { orderCreatedReducer } from './reducers/orderReducers'

// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const initialState = {
//     cart: { cartItems: [...cartItemsFromStorage] }
// };

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    updateUserData: userUpdateProfileReducer,
    orderReducer: orderCreatedReducer
});

const middleware = [thunk];

const store = configureStore(
    { reducer: reducers },
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

// console.log('from store component', store.getState())

export default store