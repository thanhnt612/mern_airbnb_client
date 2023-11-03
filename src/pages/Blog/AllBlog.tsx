import { useEffect, useState } from 'react'
import { getBlogApi } from '../../redux/reducers/bookingReducer'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { NavLink } from 'react-router-dom';
import { LoadingPage } from '../../Components/Icon';

export const AllBlog = () => {
    const dispatch: DispatchType = useDispatch();
    const [loading, setLoading] = useState(false)
    const { arrBlog } = useSelector((state: RootState) => state.bookingReducer);
    useEffect(() => {
        dispatch(getBlogApi())

        if (arrBlog.length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        } else {
            setLoading(false);
        }
    }, [arrBlog.length])
    const renderListBlog = () => {
        if (arrBlog.length === 0) {
            return (
                <div className='text-center py-3'>
                    <h4>
                        You don't have any blog!!!  <br />
                        Click below to add new blog
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 btn btn-danger text-white rounded me-2"
                            to="/blog/new">
                            Add New Blog
                        </NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='py-3'>
                    {arrBlog.map((item: any, index: number) => {
                        return <div className="main my-3 p-3 d-flex flex-row flex-wrap rounded border border-2 border-success 
                        border-opacity-25" key={index}>
                            <div className="col-12 col-md-3 position-relative">
                                <img src={item.photos[0]} alt="" className='object-fit-cover rounded w-100' />
                            </div>
                            <div className="col-12 col-md-9 detail p-3 position-relative">
                                <h5 className='fw-bold text-truncate'>
                                    {item.title}
                                </h5>
                                <p>
                                    {item.summary}
                                </p>
                                <NavLink to={`/blog/detail/${item._id}`} className="btn btn-danger">
                                    <span>
                                        👉View Detail
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    })}
                </div>
            )
        }
    }
    return (
        <div className='container list-rent bg-white rounded'>
            {loading ? (
                <LoadingPage className={`loading-spinner dark bg-transparent`} />
            ) : (
                <>
                    {renderListBlog()}
                </>
            )}
        </div>
    )
}
