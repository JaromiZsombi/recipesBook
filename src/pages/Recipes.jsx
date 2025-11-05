import React from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import { useNavigate } from 'react-router';

export const Recipes = () => {

  const navigate = useNavigate()

  return (
    <div className='recipesBase' style={{minHeight:'100vh', position:"relative"}}>
      <div className='recipesTitle' style={{textAlign:'center'}}>Receptek</div>
      <FaHouseChimney onClick={()=>navigate("/")} style={{fontSize:"30px",position:"absolute", top:"5px", left:"5px"}}/>
        <button onClick={()=>navigate("/addnew")} style={{position:"absolute", bottom:"5px", right:"5px"}}>Új receptek feltöltése</button>
    </div>
  )
}