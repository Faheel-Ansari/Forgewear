import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: false, errorSingle: false, loading: false, loadingSingle: false, data: [], isAvailable: true, paginationData: {} }

const StoreSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setPaginationData(state, action) {
            state.paginationData = action.payload
        },

        setData(state, action) {

            state.data = action.payload
        },

        setError(state, action) {
            state.error = action.payload
        },

        setErrorSingle(state, action) {
            state.errorSingle = action.payload
        },

        setIsAvailable(state, action) {
            state.isAvailable = action.payload
        },

        setLoading(state, action) {
            state.loading = action.payload
        },

        setLoadingSingle(state, action) {
            state.loadingSingle = action.payload
        },
    }
})

export const { setData, setError, setIsAvailable, setLoading, setErrorSingle, setLoadingSingle, setPaginationData } = StoreSlice.actions
export default StoreSlice.reducer