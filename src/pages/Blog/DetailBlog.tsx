import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { getBlogApi, getBlogDetailApi } from "../../redux/reducers/bookingReducer";


export const DetailBlog = () => {
    const dispatch: DispatchType = useDispatch();
    const params: any = useParams();
    const { arrBlogDetail } = useSelector((state: RootState) => state.bookingReducer);
    const { arrBlog } = useSelector((state: RootState) => state.bookingReducer);
    useEffect(() => {
        dispatch(getBlogDetailApi(params.id));
        dispatch(getBlogApi())
    }, [params.id])
    return (
        <div className="detail-blog row p-0 m-0">
            <div className="col-12 col-xl-8">
                <div className="title text-center">
                    <h3 className="fw-bold py-3">
                        {arrBlogDetail?.title}
                    </h3>
                </div>
                <div className="image pb-3 pb-md-5">
                    <img src={arrBlogDetail?.photos[0]} className="w-100" alt="" />
                </div>
                <div className="article px-4 px-md-0" style={{ textAlign: "justify" }}>
                    {arrBlogDetail?.article}
                </div>
            </div>
            <div className="col-12 col-xl-4">
                <div className="title fw-bold text-center pt-5 pb-2 ">Recent News</div>
                {arrBlog.map((blog, index) => {
                    let date = new Date(blog.createdAt).toLocaleDateString('en-GB');;
                    return <div className="main d-flex pb-3" key={index}>
                        <div className="col-4 p-2 d-flex align-items-center">
                            <img src={blog.photos[0]} className="w-100" style={{ height: "100px" }} alt="" />
                        </div>
                        <div className="col-8 p-2">
                            <NavLink to={`/blog/detail/${blog._id}`} className="text-decoration-none text-dark">
                                <p className="m-0">{blog.title}</p>
                            </NavLink>
                            <span className="text-danger">{date}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
