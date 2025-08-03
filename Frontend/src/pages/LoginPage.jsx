import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

function LoginPage() {

    const [currentState, setCurrentState] = useState("Sign up")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [isDataSubmit, setIsDataSubmit] = useState(false)

    const {login} = useContext(AppContext)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(currentState === "Sign up" && !isDataSubmit){
            setIsDataSubmit(true)
            return
        }
        login(currentState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
    }

  return (
    <div onSubmit={onSubmitHandler} className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        <img src={assets.logo_big} className='w-[26vw] mt-10' alt="" />
        <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
            <h2 className='font-medium text-2xl flex justify-between items-center'>
                {currentState}
                {isDataSubmit && <img onClick={() => setIsDataSubmit(false)} src={assets.arrow_icon} className='w-5 cursor-pointer' />}
             </h2>
            
            {currentState === "Sign up" && !isDataSubmit && <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />}

            {!isDataSubmit && (
                <>
                    <input onChange={(e) => setEmail(e.target.value)}  value={email} type="email" placeholder='Enter your Email' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter your Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

                </>
            )}

            {
                currentState === "Sign up" && isDataSubmit && (
                    <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter Your Bio' required name="" id=""></textarea>
                )
            }

            <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
                {currentState === "Sign up" ? "Create Account" : "Login Now"}
            </button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
                <input type="checkbox" name="" id="" />
                <p>Agree to the terms of use & privacy policy</p>
            </div>

            <div className='flex flex-col gap-2'>
                {
                    currentState === "Sign up" ? (
                        <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => { setCurrentState("Login"); setIsDataSubmit(false);}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
                    ) : (
                        <p className='text-gray-600 text-sm'>Create an account! <span onClick={() => {
                            setCurrentState("Sign up")
                        }} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
                    )
                }
            </div>

        </form>
    </div>
  )
}

export default LoginPage