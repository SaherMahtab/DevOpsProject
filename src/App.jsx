// src/App.jsx
import React from 'react';
import Layout from './components/layouts/Layout';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import './App.css'; // Import the custom CSS file
import Homepage2 from './pages/homepage/Homepage2';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Contactus from './pages/contactus/Contactus';
import Services from './pages/services/Services';
import About from './pages/about/About';
import Blogs from './pages/blogs/Blogs';
import Admin from './pages/admin/Admin';
import Dashboard from './pages/admin/Dashboard';
import AddOffers from './pages/admin/AddOffers';
import PriceChange from './pages/admin/PriceChange';
import Booking from './pages/booking/Booking';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import EditReviews from './pages/admin/EditReviews';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Homepage2 />} />
        <Route path='contact' element={<Contactus />} />
        <Route path='about' element={<About />} />
        <Route path='blogs' element={<Blogs />} />
        <Route path='admin' element={<Admin />} />
        <Route
          path='admin/dashboard'
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route
          path='admin/dashboard/EditOffers'
          element={<PrivateRoute element={AddOffers} />}
        />
        <Route
          path='admin/dashboard/EditTarrifs'
          element={<PrivateRoute element={PriceChange} />}
        />
        <Route
          path='admin/dashboard/EditReviews'
          element={<PrivateRoute element={EditReviews} />}
        />
        <Route path='booking' element={<Booking />} />
        <Route path='*' element={<div className='h-screen flex justify-center items-center'><h1 className='font-mono'>PAGE NOT FOUND<br/>ERROR 404</h1></div>} />
      </Route>
    )
  );
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
