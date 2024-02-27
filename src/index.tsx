import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile'
import List from './pages/List/List';
import Home_Mobile from './pages/Home/Home_Mobile';
import Detail_Mobile from './pages/Detail/Detail_Mobile';
import List_Mobile from './pages/List/List_Mobile';
import ResponsiveItem from './Components/ResponsiveItem/ResponsiveItem';
import UserTemplate from './templates/UserTemplate';
import New from './pages/New/New';
import ListRent from './pages/ListRent/ListRent';
import Update from './pages/UpdateRoom/Update';
import PlaceTemplate from './templates/PlaceTemplate';
import Blog from './pages/Blog/Blog';
import BlogTemplate from './templates/BlogTemplate';
import { DetailBlog } from './pages/Blog/DetailBlog';
import { About } from './pages/About/About';
import { Edit } from './pages/Profile/Edit';
import { UserContextProvider } from './pages/User/UserContext';
import { ListBlog } from './pages/Blog/ListBlog';
import { UpdateBlog } from './pages/Blog/UpdateBlog';
import { AllBlog } from './pages/Blog/AllBlog';
import { createBrowserHistory } from "history";
import DashBoard from './pages/DashBoard/DashBoard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword.jsx/ResetPassword';
export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <UserContextProvider>
      <HistoryRouter history={history}>
        <Routes>
          {/* Path: "/" */}
          <Route path='' element={<HomeTemplate />}>
            <Route index element={<ResponsiveItem component={Home} mobileComponent={Home_Mobile} />}></Route>
            <Route path='home' element={<ResponsiveItem component={Home} mobileComponent={Home_Mobile} />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='detail' element={<ResponsiveItem component={Detail} mobileComponent={Detail_Mobile} />}>
              <Route path=':id' element={<Detail />}></Route>
            </Route>
            <Route path='list' element={<List />}>
              <Route path=':dest' element={<List />}></Route>
            </Route>
            <Route path='profile' element={<Profile />}>
            </Route>
            <Route path='edit' element={<Edit />}></Route>
            <Route path='*' element={<Navigate to="" />}></Route>
          </Route>

          {/* Path: "/place" */}
          <Route path='place' element={<PlaceTemplate />}>
            <Route path='list-rent' element={<ListRent />}></Route>
            <Route path='new' element={<New />}></Route>
            <Route path='update-room' element={<Update />}>
              <Route path=':id' element={<Update />}></Route>
            </Route>
          </Route>

          {/* Path: "/blog" */}
          <Route path='blog' element={<BlogTemplate />}>
            <Route path='list-blog' element={<ListBlog />}></Route>
            <Route path='all-blog' element={<AllBlog />}></Route>
            <Route path='new' element={<Blog />}></Route>
            <Route path='update-blog' element={<UpdateBlog />}>
              <Route path=':id' element={<UpdateBlog />}></Route>
            </Route>
            <Route path='detail' element={<DetailBlog />}>
              <Route path=':id' element={<DetailBlog />}></Route>
            </Route>
          </Route>

          {/* Path: "/user" */}
          <Route path='user' element={<UserTemplate />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route path="reset-password" element={<ResetPassword />}></Route>
            <Route path='*' element={<Navigate to="" />}></Route>
          </Route>
          <Route path='dashboard' element={<DashBoard />}>

          </Route>
        </Routes>
      </HistoryRouter>
    </UserContextProvider>
  </Provider>
);


