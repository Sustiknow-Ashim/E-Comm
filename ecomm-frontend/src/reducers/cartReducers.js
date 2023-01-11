import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

const initiaState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
// console.log()

export const cartReducer = (state = { cartItems: [...initiaState] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            // checking item is already exist or not
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }

        default:
            return state
    }
}