import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/CartConstants";

const initiaState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialShippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
// const initialPaymentmethod = localStorage.getItem('paymentmethod') ? JSON.parse(localStorage.getItem('paymentmethod')) : {}

export const cartReducer = (state = { cartItems: [...initiaState], shippingAddress: initialShippingAddress  }, action) => {
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
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentmethod: action.payload,
            }

        default:
            return state
    }
}