import React, { useContext, useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify"
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'


const MyToastify = () => {
    const {msg, setMsg} = useContext(MyUserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(msg?.err){
            toast.error(msg.err, {position:"top-center"})
            setMsg({})
        }
        else if(msg?.signUp){
            toast.success(msg.signUp, {position:"top-center"})
            setMsg({})
            navigate('/signin')
        }else if(msg?.resetPw){
            toast.success(msg.resetPw, {position:"top-center"})
            setMsg({})
        }
    },[msg])
  return null;
}

export default MyToastify