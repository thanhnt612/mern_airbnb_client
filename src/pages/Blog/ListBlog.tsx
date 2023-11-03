import { useContext, useEffect, useState } from 'react'
import { getAuthorBlogApi } from '../../redux/reducers/bookingReducer'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { NavLink } from 'react-router-dom';
import { LoadingPage } from '../../Components/Icon';
import { UserContext } from '../User/UserContext';

export const ListBlog = () => {
    const dispatch: DispatchType = useDispatch();
    const { userInfo }: any = useContext(UserContext);
    const { arrBlogAuthor } = useSelector((state: RootState) => state.bookingReducer);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(getAuthorBlogApi(userInfo?._id))
        if (arrBlogAuthor.length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        } else {
            setLoading(false);
        }
    }, [arrBlogAuthor.length, userInfo?._id])
    const renderListBlog = () => {
        if (!userInfo) {
            return (
                <div className='text-center py-3'>
                    <h4>
                        Please login or sign up to make a blog for rent
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded me-2" to="/user/login">Log In</NavLink>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded" to="/user/register">Sign Up</NavLink>
                    </div>
                </div>
            )
        } else if (arrBlogAuthor.length === 0) {
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
                    {arrBlogAuthor.map((item: any, index: number) => {
                        return <div className="main my-3 p-3 d-flex flex-row flex-wrap rounded border border-2 border-success 
                        border-opacity-25" key={index}>
                            <div className="col-12 col-md-3 position-relative">
                                <img src={item.photos[0]} alt="" className='object-fit-cover rounded w-100' />
                                <NavLink className="d-block d-md-none m-2 position-absolute text-light btn btn-warning rounded-circle p-2 border-3 border-warning border pt-2 top-0 end-0"
                                    to={`/blog/update-blog/${item._id}`}>
                                    ✏️
                                </NavLink>
                            </div>
                            <div className="col-12 col-md-9 detail p-3 position-relative">
                                <h5 className='fw-bold text-truncate'>
                                    {item.title}
                                </h5>
                                <p>
                                    {item.summary}
                                </p>
                                <NavLink className="d-none d-md-block position-absolute text-light btn btn-outline-warning rounded-circle p-2 border-3 border-warning border pt-2 top-0 end-0"
                                    to={`/blog/update-blog/${item._id}`}>
                                    ✏️
                                </NavLink>
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
