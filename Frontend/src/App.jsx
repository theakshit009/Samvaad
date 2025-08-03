import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function App() {

  const {authUser} = useContext(AppContext)

  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-contain '>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App