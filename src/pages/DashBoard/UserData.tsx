import { useMemo, useState } from 'react'
import Pagination from '../../Components/pagination/pagination';
import { DispatchType } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/reducers/userReducer';

const UserData = ({ data, PageSize }: any) => {
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
            <th>Name</th>
            <th>Email</th>
            <th>Verify</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        {currentTableData.map((user: any, index: number) => {
          return (
            <tbody key={index}>
              <tr className='align-middle text-center' >
                <td>{index}</td>
                <td >{user.name}</td>
                <td className='text-start'>{user.email}</td>
                <td>
                  {user.verify ? "Verified" : "Not"}
                </td>
                <td>
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td>
                  <button className='btn btn-warning me-2'>
                    Role
                  </button>
                  <button className='btn btn-danger'
                    onClick={() => dispatch(deleteUser(user._id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          )
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
export default UserData 