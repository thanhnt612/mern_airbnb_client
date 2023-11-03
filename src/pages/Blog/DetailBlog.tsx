import  { useEffect } from "react";
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
            <div className="main-news col-12 col-xl-8">
                <div className="title text-center">
                    <h3 className="fw-bold py-3">
                        {arrBlogDetail?.title}
                    </h3>
                </div>
                <div className="image pb-3 pb-md-5">
                    <img src={arrBlogDetail?.photos[0]} className="w-100 rounded-3" alt="" />
                </div>
                <div className="summary px-0 px-md-0" style={{ textAlign: "justify", hyphens: "auto" }}>
                    {arrBlogDetail?.summary}
                </div>
                <div className="summary px-0 px-md-0" style={{ textAlign: "justify", hyphens: "auto" }}>
                    {arrBlogDetail?.mainArticle}
                </div>
                <div className="d-flex py-3">
                    <div className="col-6 p-2">
                        <img src={arrBlogDetail?.photos[1]} className="w-100 rounded-3" height="250px" alt="" />
                    </div>
                    <div className="col-6 p-2">
                        <img src={arrBlogDetail?.photos[2]} className="w-100 rounded-3" height="250px" alt="" />
                    </div>
                </div>
                <p style={{ textAlign: "justify", hyphens: "auto" }}>
                    {arrBlogDetail?.subArticle}
                </p>
            </div>
            <div className="recent-news col-12 col-xl-4 mt-3 rounded-3">
                <div className="rounded-3 p-3">
                    <div className="title fw-bold text-center">Recent News</div>
                    {arrBlog.filter((item, index) => index < 3).map((blog, index) => {
                        let date = new Date(blog.createdAt).toLocaleDateString('en-GB');
                        return <>
                            <div className="main d-flex p-2 mb-3 bg-white rounded-3 border border-dark" key={index}>
                                <div className="col-4 p-2">
                                    <NavLink to={`/blog/detail/${blog._id}`}>
                                        <img src={blog.photos[0]} className="w-100 rounded-3" alt="" />
                                    </NavLink>
                                </div>
                                <div className="col-8 p-1">
                                    <NavLink to={`/blog/detail/${blog._id}`} className="text-decoration-none text-dark">
                                        <p className="m-0 text-dark"
                                            style={{ fontSize: "14px" }}
                                        >{blog.title}</p>
                                    </NavLink>
                                    <span className="text-danger"
                                        style={{ fontSize: "10px" }}
                                    >{date}</span>
                                </div>
                            </div>
                        </>
                    })}
                    <div className="p-2 text-end">
                        <button className="btn btn-danger">
                            View More
                        </button>
                    </div>
                    <div className="border-top border-5 border-danger my-3"></div>
                    <div className="search bg-dark border rounded-3 p-3">
                        <p className="fw-bold text-light">
                            Search
                        </p>
                        <input type="text" className="w-100 p-2 rounded-3 border-0" style={{ outline: "none" }} />
                    </div>
                </div>
            </div>
            <div className="col-12 col-xl-8 mt-5">
                <div className="container p-1 p-md-4 bg-dark border rounded-3">
                    <div className="title p-2 p-md-3">
                        <h3 className="text-light">Leave A Reply</h3>
                        <p className="text-light mb-0">Your email address will not be published. Required fields are marked</p>
                    </div>
                    <div className="d-flex flex-wrap">
                        <div className="col-12 col-md-6 p-2 p-md-3">
                            <input type="text" className="rounded-3 w-100 bg-light p-3 border-0" placeholder="Your name" style={{ outline: "none" }} />
                        </div>
                        <div className="col-12 col-md-6 p-2 p-md-3">
                            <input type="text" className="rounded-3 w-100 bg-light p-3 border-0" placeholder="Your email" style={{ outline: "none" }} />
                        </div>
                        <div className="col-12 p-2 p-md-3">
                            <textarea rows={10} className="rounded-3 w-100 bg-light p-3 border-0" placeholder="Comment" style={{ outline: "none" }} />
                        </div>
                        <div className="p-2 p-md-3">
                            <button className="btn btn-danger">
                                Post Comment ➞
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
