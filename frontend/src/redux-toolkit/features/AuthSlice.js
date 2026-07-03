import { createSlice } from "@reduxjs/toolkit"

const initialState = { error: false, loading: false, role: 'user', user: {} }

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
    }
})

export const { setError, setLoading, setRole, setUser } = AuthSlice.actions
export default AuthSlice.reducer