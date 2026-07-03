import { createSlice } from "@reduxjs/toolkit"

const initialState = { error: false, loading: false, faqs: [], isAvailable: true }

const FAQSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
        setFAQ(state, action) {
            state.faqs = action.payload
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

export const { setError, setFAQ, setIsAvailable, setLoading } = FAQSlice.actions
export default FAQSlice.reducer