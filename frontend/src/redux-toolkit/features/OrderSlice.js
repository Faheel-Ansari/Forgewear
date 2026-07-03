import { createSlice } from "@reduxjs/toolkit"

const initialState = { error: false, loading: false, orders: [], isAvailable: true, paginationData: {} }

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setPaginationData(state, action) {
            state.paginationData = action.payload
        },

        setOrder(state, action) {
            state.orders = action.payload
        },

        setLoading(state, action) {
            state.loading = action.payload
        },

        setError(state, action) {
            state.error = action.payload
        },

        setIsAvailable(state, action) {
            state.isAvailable = action.payload
        },
    }
})

export const { setError, setOrder, setIsAvailable, setLoading, setPaginationData } = OrderSlice.actions
export default OrderSlice.reducer