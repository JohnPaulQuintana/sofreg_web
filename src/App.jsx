import React, { useState, useEffect } from "react";
import './App.css'
import Home from './app/pages/Home'
import Services from './app/pages/Service';
import About from './app/pages/About';
import Pricing from './app/pages/Pricing';
import Contact from './app/pages/Contact';
import Career from './app/pages/Career';
import Loader from "./app/components/Loader";
import {BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import NotFound from "./app/pages/NotFound";
import Sidebar from "./app/components/Sidebar";
import Login from "./auth/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import EmployeeDashboard from "./employee/pages/Dashboard";

function App() {
  // const location = useLocation();
  // useEffect(() => {
  //   // Check if the pathname is the root ('/') or any other specific page
  //   if (location.pathname === "/") {
  //     console.log("On homepage, refreshing...");
  //     // Reload the page
  //     window.location.reload();
  //   }
  // }, [location.pathname]); // Only run when pathname changes

  if (process.env.NODE_ENV === 'development') {
    // console.log = () => {}; // Disable console.log
    // console.warn = () => {}; // Disable console.warn
    // console.error = () => {}; // Disable console.error
  }
  

  // Helper component for protected routes
  const ProtectedRoute = ({ children, role }) => {
    const token = JSON.parse(localStorage.getItem('authentication'));

    if (!token) {
      return <Navigate to="/login" />;
    }

    if (token && token.role !== role) {
      return <Navigate to="/login" />; // Redirect if role doesn’t match
    }

    return children;
  };

  
  return (
    <>
    <BrowserRouter>
      {/* {isLoading && <Loader />}  */}
      {/* <Sidebar /> */}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/career' element={<Career />} />

          {/* googlesheet as database hahaha */}
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute role='admin'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/employee'
          element={
            <ProtectedRoute role='employee'>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </BrowserRouter>

    </>
  )
}

export default App
