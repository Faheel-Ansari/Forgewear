import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "../features/themeSlice"
import storeReducer from "../features/StoreSlice"
import faqReducer from "../features/FAQSlice"
import authReducer from "../features/AuthSlice"
import cartReducer from "../features/CartSlice"
import reviewReducer from "../features/ReviewSlice"
import orderReducer from "../features/OrderSlice"
import mediaReducer from "../features/MediaSlice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        store: storeReducer,
        faq: faqReducer,
        auth: authReducer,
        cart: cartReducer,
        review: reviewReducer,
        order: orderReducer,
        media: mediaReducer,
    }
})