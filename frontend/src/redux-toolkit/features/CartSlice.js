import { createSlice } from "@reduxjs/toolkit"

const initialState = { cartItems: JSON.parse(localStorage.getItem('cart')) || [], cartCount: 0, error: false, isAvailable: true, loading: false, data: [] }

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload
        },

        setData(state, action) {
            state.data = action.payload
        },

        setCartCount(state, action) {
            state.cartCount = action.payload
        },

        setError(state, action) {
            state.error = action.payload
        },

        setIsAvailable(state, action) {
            state.isAvailable = action.payload
        },

        setLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export const { setCartItems, setCartCount, setError, setIsAvailable, setLoading, setData } = CartSlice.actions
export default CartSlice.reducer