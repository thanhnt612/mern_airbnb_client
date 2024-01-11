import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './reducers/bookingReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        bookingReducer,
        userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;