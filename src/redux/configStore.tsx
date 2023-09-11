import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer';
import bookingReducer from './reducers/bookingReducer';
export const store = configureStore({
    reducer: {
        userReducer,
        bookingReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;