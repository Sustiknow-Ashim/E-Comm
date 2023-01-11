// import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
// import { cartReducer } from "./reducers/cartReducers";
// // Reduc-persist
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore, persistCombineReducers } from 'redux-persist'

// const persistConfig = {
//     key: 'root',
//     storage: storage
// };

// const reducers = combineReducers({
//     productList: productListReducer,
//     productDetails: productDetailsReducer,
//     cart: cartReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducers)
// console.log(persistedReducer)


// // const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// // const initialState = {
// //     cart: { cartItems : [...cartItemsFromStorage] }
// // };

// const middleware = [thunk]

// const store = configureStore(
//     // {reducer: reducers},
//     { reducer: persistedReducer },
//     {middleware: [thunk]},
//     // initialState,
//     // composeWithDevTools(applyMiddleware(...middleware))
// )

// let persistor = persistStore(store)
// export default persistor





// ////////////////////////////////////////////////

import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";


// const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const initialState = {
//     cart: { cartItems: [...cartItemsFromStorage] }
// };

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const middleware = [thunk];

const store = configureStore(
    { reducer: reducers },
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

console.log('from store component', store.getState())

export default store