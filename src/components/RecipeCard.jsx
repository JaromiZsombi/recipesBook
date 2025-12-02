import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { deleteRecipe } from '../myBackend';
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';

export const RecipeCard = ({id, name,steps, ingredients, imgUrl, deleteUrl, uid, displayName}) => {

    const {user} = useContext(MyUserContext)
    
    const navigate=useNavigate()

  return (
    <div className='cardok' style={{margin:"20px", position:"relative", maxHeight:"1200px", display:"flex", flexDirection:"column"}}>
        <h2><span>{name}</span> <br /><span> ({displayName})</span></h2>
        <div className='hozzavalokBase'>
            <p className='hozzavalok'>Hozzávalók: </p>
            <hr />
            <ul className='hozzavalokList'>{ingredients.map(obj=><li>{obj}</li>)}</ul>
        </div>
        
        <img src={imgUrl} alt={name} style={{maxWidth:"500px", marginTop:"10px", borderRadius:"10px"}} />
        <div style={{backgroundColor:"white", marginTop:"10px", borderRadius:"10px", paddingTop:"10px", paddingBottom:"10px",display:"flex", flexDirection:"column", maxHeight:"100%", overflowY:"scroll", textAlign:"center", overflowX:"hidden"}}>
            <p className='hozzavalok' style={{textAlign:"center"}}>Elkészítés: </p>
            <hr />
            <p style={{paddingLeft:"20px", paddingRight:"20px", maxHeight:"100%", flex:"1"}}>{steps}</p>
        </div>
        
        {user && user.uid== uid &&
        <div style={{fontSize:"30px",position:"absolute", top:"20px", right:"10px"}}>
            <MdDeleteForever style={{cursor:"pointer"}} size={50} onClick={()=>deleteRecipe(id, deleteUrl)}/>
            <CiEdit style={{cursor:"pointer"}} size={50} onClick={()=>navigate('/edit/'+id)}/>
        </div>
        }
    </div>
  )
}