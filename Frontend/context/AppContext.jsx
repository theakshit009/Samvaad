import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import toast from 'react-hot-toast'
import { useEffect } from "react";
import {io} from 'socket.io-client'

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

export const AppContext = createContext()



export const AppProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    //check if user is Authenticated or not
    const checkAuth = async () => {
        try {
            const {data} = await axios.get("/api/v1/auth/check")
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //login Function
    const login = async (state, credentials) => {
        try {
            const {data} = await axios.post(`/api/v1/auth/${state}`,credentials)
            if(data.success){
                setAuthUser(data.userData)
                connectSocket(data.userData)
                axios.defaults.headers.common["token"] = data.token
                setToken(data.token)
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)  
        }
    }

    //logout function
    const logout = async () => {
        localStorage.removeItem("token")
        setToken(null)
        setAuthUser(null)
        setOnlineUsers([])
        axios.defaults.headers.common["token"] = null
        socket.disconnect()
    }

    //update profile function
    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put("/api/v1/auth/update-profile", body)
            if(data.success){
                setAuthUser(data.user)
                toast.success("Profile updated Successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //connect socekt function
    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        })
        newSocket.connect()
        setSocket(newSocket)
        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds)
        })
    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["token"] = token
        }
        checkAuth()
    },[])
 

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
