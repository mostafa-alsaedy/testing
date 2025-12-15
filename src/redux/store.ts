import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "./slices/counterSlice"
import { productsReducer } from "./slices/productsSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        product: productsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatcher = typeof store.dispatch
