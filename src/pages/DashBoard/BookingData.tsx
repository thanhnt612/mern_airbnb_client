import { useMemo, useState } from 'react'
import Pagination from '../../Components/pagination/pagination';
import { deleteBooking } from '../../redux/reducers/bookingReducer';
import { DispatchType } from '../../redux/configStore';
import { useDispatch } from 'react-redux';

const BookingData = ({ data, PageSize }: any) => {
    const dispatch: DispatchType = useDispatch();
    const [current, setCurrent] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (current - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [data, current]);

    return (
        <>
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-danger align-middle text-center'>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Picture</th>
                        <th>Price</th>
                        <th>Max Guest</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {currentTableData.map((booking: any, index: number) => {
                    const checkin = new Date(booking.checkIn).toLocaleDateString('en-GB')
                    const checkout = new Date(booking.checkOut).toLocaleDateString('en-GB')
                    let dateCurrent = new Date().toISOString()
                    return (
                        <tbody key={index}>
                            <tr className='align-middle text-center'>
                                <td>{index}</td>
                                <td>{booking.name}</td>
                                <td>{booking.phone}</td>
                                <td className='text-start'>{booking.placeId.title}</td>
                                <td className='text-start'>
                                    {booking.placeId.address.substring(booking.placeId.address.indexOf(",") + 1)}
                                </td>
                                <td>{checkin}</td>
                                <td>{checkout}</td>
                                <td>
                                    <img src={booking.placeId.photos[0]} width={80} height={50} alt="" />
                                </td>
                                <td>{booking.price} $</td>
                                <td>{booking.numberOfGuest}</td>
                                <td>
                                    {booking.checkOut < dateCurrent
                                        ?
                                        <span className='text-danger'>Expire</span>
                                        :
                                        <span className='text-success'>Staying</span>
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-warning me-2'>
                                        Edit
                                    </button>
                                    <button className='btn btn-danger'
                                        onClick={() => dispatch(deleteBooking(booking._id, booking.placeId._id))}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={current}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={(page: React.SetStateAction<number>) => setCurrent(page)}
            />
        </>
    )
}
export default BookingData 