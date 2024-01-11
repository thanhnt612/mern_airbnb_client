import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface PlaceModel {
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
    available: boolean
}
export interface HistoryBookingModel {
    placeId: object,
    guestId: string,
    name: string,
    phone: string,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    price: number
}
export interface BlogModel {
    _id: string;
    title: string;
    summary: string;
    mainArticle: string;
    subArticle: string;
    photos: string[];
    createdAt: string;
    updatedAt: string
}

interface BookingState {
    arrPlace: PlaceModel[],
    arrOwnerRoom: PlaceModel[],
    arrHistory: HistoryBookingModel[],
    arrBookingId: PlaceModel | null,
    arrLocation: PlaceModel[] | null,
    arrBlog: BlogModel[],
    arrBlogDetail: BlogModel | null,
    arrBlogAuthor: BlogModel[],
    arrBookingDashboard: HistoryBookingModel[]
}

const initialState: BookingState = {
    arrPlace: [],
    arrOwnerRoom: [],
    arrBookingId: null,
    arrHistory: [],
    arrLocation: null,
    arrBlog: [],
    arrBlogDetail: null,
    arrBlogAuthor: [],
    arrBookingDashboard: []
}

const bookingReducer = createSlice({
    name: 'bookingReducer',
    initialState,
    reducers: {
        setArrAction:
            (state: BookingState, action: PayloadAction<PlaceModel[]>) => {
                const arrBookingList: PlaceModel[] = action.payload;
                state.arrPlace = arrBookingList;
            },
        setArrIdAction:
            (state: BookingState, action: PayloadAction<PlaceModel>) => {
                const arrBookingList: PlaceModel = action.payload;
                state.arrBookingId = arrBookingList;
            },
        setArrOwnerAction:
            (state: BookingState, action: PayloadAction<PlaceModel[]>) => {
                const arrOwnerRoomList: PlaceModel[] = action.payload;
                state.arrOwnerRoom = arrOwnerRoomList;
            },
        setHistoryAction:
            (state: BookingState, action: PayloadAction<HistoryBookingModel[]>) => {
                state.arrHistory = action.payload;
            },
        setLocationAction:
            (state: BookingState, action: PayloadAction<PlaceModel[]>) => {
                const arrLocationList: PlaceModel[] = action.payload;
                state.arrLocation = arrLocationList;
            },
        setBlogAction:
            (state: BookingState, action: PayloadAction<BlogModel[]>) => {
                const arrBlogList: BlogModel[] = action.payload;
                state.arrBlog = arrBlogList;
            },
        setBlogDetailAction:
            (state: BookingState, action: PayloadAction<BlogModel>) => {
                const arrBlogDetail: BlogModel = action.payload;
                state.arrBlogDetail = arrBlogDetail;
            },
        setListBlogAuthorAction:
            (state: BookingState, action: PayloadAction<BlogModel[]>) => {
                const arrListBlog: BlogModel[] = action.payload;
                state.arrBlogAuthor = arrListBlog;
            },
        setBookingDashboard:
            (state: BookingState, action: PayloadAction<HistoryBookingModel[]>) => {
                state.arrBookingDashboard = action.payload;
            },
    }
});

export const {
    setArrAction,
    setArrIdAction,
    setArrOwnerAction,
    setHistoryAction,
    setLocationAction,
    setBlogAction,
    setBlogDetailAction,
    setListBlogAuthorAction,
    setBookingDashboard
} = bookingReducer.actions
export default bookingReducer.reducer

//--------------------Action Async ---------------------
export const getBookingApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place');
        let arrPlace: PlaceModel[] = result.data.content;
        const action: PayloadAction<PlaceModel[]> = setArrAction(arrPlace);
        dispatch(action)
    }
}
export const getBookingDetailApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/' + id);
        let arrBookingId: PlaceModel = result.data.content;
        const action: PayloadAction<PlaceModel> = setArrIdAction(arrBookingId);
        dispatch(action)
    }
}

export const getOwnerRoomApi = (owner: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/owner/' + owner);
        let arrOwnerRoom: PlaceModel[] = result.data.content;
        const action: PayloadAction<PlaceModel[]> = setArrOwnerAction(arrOwnerRoom);
        dispatch(action)
    }
}
export const postBookingApi = (
    placeId: object,
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
        if (result.data.status === 200) {
            toast.success('Booking room successfully !!!', {
                position: "bottom-center",
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
        let arrBookingLocation: PlaceModel[] = result.data.content;
        const action: PayloadAction<PlaceModel[]> = setLocationAction(arrBookingLocation);
        dispatch(action)
    }
}

export const getBlogApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/blog');
        let arrBlog: BlogModel[] = result.data.data.content;
        const action: PayloadAction<BlogModel[]> = setBlogAction(arrBlog);
        dispatch(action)
    }
}

export const getBlogDetailApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/blog/' + id);
        let arrBlogDetail: BlogModel = result.data.content;
        const action: PayloadAction<BlogModel> = setBlogDetailAction(arrBlogDetail);
        dispatch(action)
    }
}

export const getAuthorBlogApi = (author: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/blog/author/' + author);
        let arrBlogAuthor: BlogModel[] = result.data.content;
        const action: PayloadAction<BlogModel[]> = setListBlogAuthorAction(arrBlogAuthor);
        dispatch(action)
    }
}

export const getBookingListToDashboard = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/dashboard/booking')
        let arrHistoryBooking: HistoryBookingModel[] = result.data.content;
        const action: PayloadAction<HistoryBookingModel[]> = setBookingDashboard(arrHistoryBooking);
        dispatch(action)
    }
}
export const checkStatusRoom = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/check')
        console.log(result);
    }
}
// export const changeStatusRoom = (placeId: string) => {
//     console.log(placeId);
//     return async (dispatch: DispatchType) => {
//         const result: any = await http.post('/booking/status/'+ placeId)
//     }
// }