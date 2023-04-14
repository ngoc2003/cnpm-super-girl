import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppState } from './stores';

import AboutPage from './pages/AboutPage';
import ListRequest from './pages/ListRequest';
import OrderPage from './pages/OrderPage';
import BookDetail from './pages/BookDetail';
import HomePageUser from './pages/HomePageUser';
import LibraryPage from './pages/LibraryPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/profile';

const LayoutAdmin = lazy(() => import('./layouts/LayoutAdmin'));
const LayoutAuthen = lazy(() => import('./layouts/LayoutAuthen'));
const LayoutDefault = lazy(() => import('./layouts/LayoutDefault'));
const HomePageStaff = lazy(() => import('./pages/HomePageStaff'));
// Admin
const Staff = lazy(() => import('./pages/admin/Staff'));
const Bookstore = lazy(() => import('./pages/admin/bookstore'));
const AddBook = lazy(() => import('./pages/admin/bookstore/AddBook'));
const ListBook = lazy(() => import('./pages/admin/bookstore/ListBook'));
const UpdateBook = lazy(() => import('./pages/admin/bookstore/UpdateBook'));
const Reader = lazy(() => import('./pages/admin/reader'));
const Request = lazy(() => import('./pages/admin/request'));
const Statistic = lazy(() => import('./pages/admin/statistic'));
const Employee = lazy(() => import('./pages/admin/employee'));
const UpdateUser = lazy(() => import('./pages/admin/UpdateUser'));
const AddEmloyee = lazy(() => import('./pages/admin/employee/AddEmloyee'));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (!user && window.location.pathname.includes('staff')) {
      navigate('/');
    }
  }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<LayoutAuthen />}>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
        </Route>
        {/* default */}
        <Route element={<LayoutDefault />}>
          <Route path='/' element={<HomePageUser />} />
          <Route path='/Library' element={<LibraryPage />} />
          <Route path='/Order' element={<OrderPage />} />
          <Route path='/staff' element={<HomePageStaff />} />
          <Route path='/Library/:slug' element={<BookDetail />} />
          <Route path='/List' element={<ListRequest />} />
          <Route path='/About' element={<AboutPage />} />
          <Route path='*' element={<HomePageUser />} />
          {/* user */}
          <Route
            path='/me'
            element={user ? <Profile /> : <Navigate to='/' />}
          />
        </Route>

        {/* admin */}
        <Route element={<LayoutAdmin />}>
          <Route path='/staff/account' element={<Staff />} />
          <Route path='/staff/account/Bookstore' element={<Bookstore />} />
          <Route path='/staff/account/Bookstore/add' element={<AddBook />} />
          <Route path='/staff/account/Bookstore/all' element={<ListBook />} />
          <Route
            path='/staff/account/Bookstore/update/:slug'
            element={<UpdateBook />}
          />
          {/* Employee */}
          <Route path='/staff/account/Employee' element={<Employee />} />
          <Route path='/staff/account/Employee/add' element={<AddEmloyee />} />
          <Route
            path='/staff/account/User/update/:slug'
            element={<UpdateUser />}
          />
          {/* Reader */}
          <Route path='/staff/account/Readers' element={<Reader />} />
          <Route path='/staff/account/*' element={<Staff />} />
          {/* Request */}
          <Route path='/staff/account/Request' element={<Request />} />
          {/* Statistic */}
          <Route path='/staff/account/Statistic' element={<Statistic />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
