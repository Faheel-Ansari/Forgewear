import { createSlice } from "@reduxjs/toolkit"

const initialState = { reviews: [], reviewsCount: 0, paginationData: {}, error: false, isAvailable: true, loading: false }

const ReviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload
        },

        setReviewsCount(state, action) {
            state.reviewsCount = action.payload
        },

        setPaginationData(state, action) {
            state.paginationData = action.payload
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

export const { setReviews, setReviewsCount, setError, setIsAvailable, setLoading, setPaginationData } = ReviewSlice.actions
export default ReviewSlice.reducer