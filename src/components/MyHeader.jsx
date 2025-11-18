import React from 'react'
import { useNavigate } from 'react-router'
import { FaHouseChimney } from "react-icons/fa6";
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { RxAvatar } from "react-icons/rx";

export const MyHeader = () => {
    const navigate = useNavigate()
    const { user, logoutUser } = useContext(MyUserContext)
  return (
    <div className='MyHeaderCss'>
      <FaHouseChimney onClick={() => navigate("/")} style={{ fontSize: "30px" }} className='house' />
      {user ?

        <div className='MyHeaderCssButton'>
          <RxAvatar className='MyHeaderCssButton' size={50} style={{ color: "white" }} title={user?.displayName} />
          <button className='MyHeaderCssButton' onClick={() => logoutUser()}>
            Kijelentkezés
          </button>
        </div>
        :
        <div className='MyHeaderCssButton'>
          <button className='MyHeaderCssButton' onClick={() => navigate("/signup")}>
             Regisztrálás
          </button>
          <button className='MyHeaderCssButton' onClick={() => navigate("/signin")}>
             Bejelentkezés
          </button>
        </div>

      }
    </div>
  )
}