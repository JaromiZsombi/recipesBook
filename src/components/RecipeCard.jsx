import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { deleteRecipe } from '../myBackend';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router';

export const RecipeCard = ({id, name,steps, ingredients, imgUrl, deleteUrl, uid, displayName}) => {

    const navigate=useNavigate()

  return (
    <div className='cardok' style={{margin:"20px", maxWidth:"1000px", position:"relative"}}>
        <h1>{name} by: {displayName}</h1>
        <div className='hozzavalokBase'>
            <p className='hozzavalok'>Hozzávalók: </p>
            <ul>{ingredients.map(obj=><li>{obj}</li>)}</ul>
        </div>
        
        <img src={imgUrl} alt={name} style={{maxWidth:"500px", marginTop:"10px", borderRadius:"10px"}} />
        <div style={{backgroundColor:"white", borderRadius:"10px", paddingTop:"10px", paddingBottom:"10px"}}>
            <p>Elkészítés: </p>
            <p >{steps}</p>
        </div>

        <div style={{fontSize:"30px",position:"absolute", top:"10px", right:"10px"}}>
            <MdDeleteForever size={50} onClick={()=>deleteRecipe(id, deleteUrl)}/>
            <CiEdit size={50} onClick={()=>navigate('/edit/'+id)}/>
        </div>
        
    </div>
  )
}