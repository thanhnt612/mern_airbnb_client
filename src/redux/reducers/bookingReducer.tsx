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
export interface Avatar {
    profile: string;
    avatar: string
}

interface BookingState {
    arrBooking: BookingModel[],
    arrOwnerRoom: BookingModel[],
    arrHistory: HistoryBookingModel[],
    arrBookingId: BookingModel | null,
    arrLocation: BookingModel[] | null,
    arrBlog: BlogModel[],
    arrBlogDetail: BlogModel | null,
    arrBlogAuthor: BlogModel[],
    arrAvatar: Avatar | null | any
}

const initialState: BookingState = {
    arrBooking: [],
    arrOwnerRoom: [],
    arrBookingId: null,
    arrHistory: [],
    arrLocation: null,
    arrBlog: [],
    arrBlogDetail: null,
    arrBlogAuthor: [],
    arrAvatar: []
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
        setAvatarAction:
            (state: BookingState, action: PayloadAction<Avatar>) => {
                const arrAvatar = action.payload;
                state.arrAvatar = arrAvatar;
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
    setAvatarAction
} = bookingReducer.actions
export default bookingReducer.reducer

//--------------------Action Async ---------------------
export const getBookingApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place');
        let arrBooking: BookingModel[] = result.data.content;
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

export const getOwnerRoomApi = (owner: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/place/owner/' + owner);
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
        let arrBookingLocation: BookingModel[] = result.data.content;
        const action: PayloadAction<BookingModel[]> = setLocationAction(arrBookingLocation);
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
export const getProfileAvatarApi = (profile: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/user/avatar/' + profile);
        let arrProfile: Avatar = result.data.content;
        const action: PayloadAction<Avatar> = setAvatarAction(arrProfile);
        dispatch(action)
    }
}