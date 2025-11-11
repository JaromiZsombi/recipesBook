import React from 'react'
import { useNavigate } from 'react-router'
import { FaHouseChimney } from "react-icons/fa6";

export const MyHeader = () => {
  const navigate = useNavigate()
  return (
    <div className='MyHeaderCss'>
      <button onClick={() => navigate("/signin")}>SignIn</button>
      <button onClick={() => navigate("/signup")}>SignUp</button>
      <FaHouseChimney onClick={()=>navigate("/")} style={{fontSize:"30px",position:"absolute", top:"5px", left:"5px"}}/>
    </div>
  )
}