import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './reducers/bookingReducer';

export const store = configureStore({
    reducer: {
        bookingReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;