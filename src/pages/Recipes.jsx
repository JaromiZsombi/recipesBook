import React from 'react'
import { useEffect } from 'react';
import { FaHouseChimney } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router';
import { readRecipes } from '../myBackend';
import { RecipeCard } from '../components/RecipeCard';
import { useState } from 'react';

export const Recipes = () => {
  const [recipes, setRecipes]=useState([])

  const {id} = useParams()

  id && console.log(id)

  const navigate = useNavigate()

  useEffect(()=>{
    readRecipes(setRecipes)
  }, [])

  return (
    <div className='recipesBase' style={{minHeight:'100vh', padding:"20px", display:"flex", flexDirection:"column", justifySelf:"center"}}>
      <div className='recipesTitle' style={{textAlign:'center'}}>
        {recipes && recipes.length>0 && recipes.map(obj=><RecipeCard key={obj.id} {...obj}/>)}
        {recipes && recipes.length==0 && <h4>Nincsenek receptek feltöltve</h4>}
      </div>
      <FaHouseChimney onClick={()=>navigate("/")} style={{fontSize:"30px",position:"absolute", top:"5px", left:"5px"}}/>
        <button onClick={()=>navigate("/addnew")} style={{position:"absolute", bottom:"5px", right:"5px"}}>Új receptek feltöltése</button>
    </div>
  )
}