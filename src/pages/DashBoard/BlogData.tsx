import { useMemo, useState } from 'react'
import Pagination from '../../Components/pagination/pagination';

const BlogData = ({ data, PageSize }: any) => {
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
            <th>Picture</th>
            <th>Author</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        {currentTableData.map((blog: any, index: number) => {
          let date = new Date(blog.createdAt).toLocaleDateString('en-GB');
          return (
            <tbody key={index}>
              <tr className='align-middle text-center' >
                <td>{index}</td>
                <td>{blog.title}</td>
                <td>
                  <img src={blog.photos[0]} width={80} height={50} alt="" />
                </td>
                <td>{blog.author.name}</td>
                <td>{date}</td>
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
export default BlogData 