import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface BookingModel {
    [x: string]: any;
    id: string;
    title: string;
    address: string;
    photo: string[];
    description: string;
    perk: string[];
    checkIn: string;
    checkOut: string;
    maxGuest: string;
    price: string
}
export interface HistoryBookingModel {
    placeId: string,
    guestId: string,
    name: string,
    phone: string,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    price: number
}

interface BookingState {
    arrBooking: BookingModel[],
    arrOwnerRoom: BookingModel[],
    arrHistory: HistoryBookingModel[],
    arrBookingId: BookingModel | null,
    arrLocation: BookingModel[] | null,
}

const initialState: BookingState = {
    arrBooking: [],
    arrOwnerRoom: [],
    arrBookingId: null,
    arrHistory: [],
    arrLocation: null
}

const bookingReducer = createSlice({
    name: 'bookingReducer',
    initialState,
    reducers: {
        setArrAction:
            (state: BookingState, action: PayloadAction<BookingModel[]>) => {
                const arrBookingList: BookingModel[] = action.payload;
                state.arrBooking = arrBookingList;
            },
        setArrIdAction:
            (state: BookingState, action: PayloadAction<BookingModel>) => {
                const arrBookingList: BookingModel = action.payload;
                state.arrBookingId = arrBookingList;
            },
        setArrOwnerAction:
            (state: BookingState, action: PayloadAction<BookingModel[]>) => {
                const arrOwnerRoomList: BookingModel[] = action.payload;
                state.arrOwnerRoom = arrOwnerRoomList;
            },
        setHistoryAction:
            (state: BookingState, action: PayloadAction<HistoryBookingModel[]>) => {
                state.arrHistory = action.payload;
            },
        setLocationAction:
            (state: BookingState, action: PayloadAction<BookingModel[]>) => {
                const arrLocationList: BookingModel[] = action.payload;
                state.arrLocation = arrLocationList;
            },
    }
});

export const {
    setArrAction,
    setArrIdAction,
    setArrOwnerAction,
    setHistoryAction,
    setLocationAction
} = bookingReducer.actions
export default bookingReducer.reducer

//--------------------Action Async ---------------------
export const getBookingApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place');
        let arrBooking: BookingModel[] = result.data.data.content;
        const action: PayloadAction<BookingModel[]> = setArrAction(arrBooking);
        dispatch(action)
    }
}
export const getBookingDetailApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/' + id);
        let arrBookingId: BookingModel = result.data.content;
        const action: PayloadAction<BookingModel> = setArrIdAction(arrBookingId);
        dispatch(action)
    }
}

export const getOwnerRoomApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/owner/' + id);
        let arrOwnerRoom: BookingModel[] = result.data.content;
        const action: PayloadAction<BookingModel[]> = setArrOwnerAction(arrOwnerRoom);
        dispatch(action)
    }
}
export const postBookingApi = (
    placeId: string,
    guestId: string,
    name: string,
    phone: string,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    price: number
) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post("/booking/", {
            placeId, guestId, name, phone, checkIn,
            checkOut, numberOfGuest, price
        });
        console.log(result);
        if (result.data.status === 200) {
            toast.success('Booking room successfully !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/profile"
            });
        }
    };
};
export const getBookingProfileApi = (guestId: number) => {
    return async (dispatch: DispatchType) => {
        const result = await http.get('/booking/' + guestId);
        let bookingHistory: HistoryBookingModel[] = result.data.content;
        const action: PayloadAction<HistoryBookingModel[]> =
            setHistoryAction(bookingHistory);
        dispatch(action);
    }
}

export const getBookingLocationApi = (destination: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/dest/' + destination);
        let arrBookingLocation: BookingModel[] = result.data.content;
        const action: PayloadAction<BookingModel[]> = setLocationAction(arrBookingLocation);
        dispatch(action)
    }
}