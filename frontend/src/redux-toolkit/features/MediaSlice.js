import { createSlice } from "@reduxjs/toolkit"

const initialState = { images: {} }

const MediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setImages(state, action) {
            state.images = action.payload
        }
    }
})

export const { setImages } = MediaSlice.actions
export default MediaSlice.reducer