import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Manager } from './components/Manager'
import { Navbar } from './components/Navbar'
import Generate from './components/Generate'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'


function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <p className='absolute top-1/3'
      style={{ "left": "45%" }}
    > <lord-icon
      src="https://cdn.lordicon.com/ktsahwvc.json"
      trigger="loop"
      delay="200"
      style={{ "width": "80px", "height": "80px", "paddingTop": "4px" }}
    >
      </lord-icon> </p>
  }

  if (error) {
    return <div className='absolute top-1/3 p-5'> Error: {error.message} </div>
  }

  return (
    <main>
      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="colored"
      />
      <ToastContainer />

      <Routes>

        // Authentication
        {isAuthenticated ? (
          <>
            {/* {console.log(isAuthenticated, "isit")} */}
            <Route path="" element={<Manager />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/generate" element={<Generate />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : (
          <>
            <Route path="/generate" element={<Generate />} />
            <Route path="*" element={<Navigate to="/generate" />} />
          </>
        )}
        {/* </Switch> */}
      </Routes>
    </main>
  );
}

export default App
