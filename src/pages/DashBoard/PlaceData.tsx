import { useMemo, useState } from 'react'
import Pagination from '../../Components/pagination/pagination';

const PlaceData = ({ data, PageSize }: any) => {
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
            <th>Title</th>
            <th>Address</th>
            <th>Max Guest</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {currentTableData.map((place: any, index: number) => {
          return (
            <tbody key={index}>
              <tr className='align-middle text-center'>
                <td>{index}</td>
                <td className='text-start'>{place.title}</td>
                <td className='text-start'>{place.address}</td>
                <td>{place.maxGuest}</td>
                <td>{place.price} $</td>
                <td>
                  {place.available
                    ?
                    <span className='text-success'>Availability</span>
                    :
                    <span className='text-danger'>Fully - Booked</span>
                  }
                </td>
                <td>
                  <button className='btn btn-warning me-2'>
                    Edit
                  </button>
                  <button className='btn btn-danger'>
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
export default PlaceData 