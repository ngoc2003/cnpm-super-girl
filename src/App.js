import React, { Suspense, lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';

const LayoutAdmin = lazy(() => import('./layouts/LayoutAdmin'));
const LayoutAuthen = lazy(() => import('./layouts/LayoutAuthen'));
const LayoutDefault = lazy(() => import('./layouts/LayoutDefault'));
const Staff = lazy(() => import('./pages/admin/Staff'));
const HomePageStaff = lazy(() => import('./pages/HomePageStaff'));
const HomePageUser = lazy(() => import('./pages/HomePageUser'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const BookDetail = lazy(() => import('./pages/BookDetail'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const ListRequest = lazy(() => import('./pages/ListRequest'));
const EventPage = lazy(() => import('./pages/EventPage'));
// Admin
const Bookstore = lazy(() => import('./pages/admin/bookstore'));
const AddBook = lazy(() => import('./pages/admin/bookstore/AddBook'));
const ListBook = lazy(() => import('./pages/admin/bookstore/ListBook'));
const UpdateBook = lazy(() => import('./pages/admin/bookstore/UpdateBook'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const Reader = lazy(() => import('./pages/admin/reader'));
const Request = lazy(() => import('./pages/admin/request'));
const Statistic = lazy(() => import('./pages/admin/statistic'));
const Employee = lazy(() => import('./pages/admin/employee'));
const UpdateUser = lazy(() => import('./pages/admin/UpdateUser'));
const AddEmloyee = lazy(() => import('./pages/admin/employee/AddEmloyee'));

function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user]);
  useEffect(() => {
    if (!user && window.location.pathname.includes('staff')) {
      navigate('/');
    }
  }, []);

  return (
    <Suspense fallback={<Spin />}>
      <Routes>
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
          <Route path='/List' element={<ListRequest id={user._id} />} />
          <Route path='/Event' element={<EventPage />} />
          <Route path='*' element={<HomePageUser />} />
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
    </Suspense>
  );
}

export default App;
