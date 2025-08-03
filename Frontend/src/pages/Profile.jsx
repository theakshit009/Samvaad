import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'

function Profile() {

  const {authUser, updateProfile} = useContext(AppContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const[name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImage){
      await updateProfile({
        fullName: name,
        bio
      })
      navigate('/')
      return
    }
    const render = new FileReader
    render.readAsDataURL(selectedImage)
    render.onload = async () => {
      const base64Image = render.result
      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio
      })
      navigate('/')
    }
  }
  
  useEffect(() => {
  if (authUser) {
    setName(authUser.fullName || "")
    setBio(authUser.bio || "")
  }
}, [authUser])
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className=' w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handelSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avtar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avtar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Upload profile image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focous:ring-violet-500' name="" id="" />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} name="" required placeholder='Enter Your Bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focous:ring-violet-500' rows={4} id=""></textarea>
          <button className='p-2 bg-gradient-to-r from-purple-400 to-violet-600 text-white  rounded-full cursor-pointer' type='submit'>Save</button>
        </form>
        <img className={`max-w-80 aspect-square rounded-full mx-2 max-sm:mt-5 ${selectedImage && 'rounded-full'}`} src={authUser?.profilePic  || assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default Profile