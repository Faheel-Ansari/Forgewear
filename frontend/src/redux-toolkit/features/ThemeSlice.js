import { createSlice } from "@reduxjs/toolkit";

const localStorageTheme = localStorage.getItem("forgeTheme")
const initialState = { currentTheme: localStorageTheme || "LIGHT" }


const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action) {
            state.currentTheme = action.payload
            localStorage.setItem("forgeTheme", state.currentTheme || initialState.currentTheme)
        }
    }
})

export const { setTheme } = ThemeSlice.actions
export default ThemeSlice.reducer