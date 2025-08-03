import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'

function App() {
  return (
    <div className='bg-[url("./src/assets/bgImage.svg")] bg-contain '>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App