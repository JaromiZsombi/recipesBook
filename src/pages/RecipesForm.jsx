import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router';
import { FaPlus } from "react-icons/fa6";
import { addRecipe, readRecipe, updateRecipe } from '../myBackend';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';

export const RecipesForm = () => {

  const {user} = useContext(MyUserContext)
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const navigate = useNavigate()

  const {id} = useParams()
  console.log(id);
  console.log(recipe)

  useEffect(()=>{
    if(id)
      readRecipe(id, setRecipe)
  },[id]) 

  useEffect(()=>{
    if(recipe){
      setName(recipe.name)
      setCategory(recipe.category)
      setIngredients(recipe.ingredients)
      setSteps(recipe.steps)
      setPreview(recipe.imgUrl)
    }
  },[recipe])
  


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let inputData = {name, ingredients, steps, category, uid:user.uid, displayName:user.displayName}
    console.log(inputData);
    if(id){
      //update
      await updateRecipe(id, !file ? {...inputData,imgUrl:recipe.imgUrl,deleteUrl:recipe.deleteUrl}: inputData,file)
      
    }else{
      await addRecipe(inputData, file)
    }
      setName("")
      setCategory("")
      setIngredients([""])
      setSteps("")
      setFile(null)
      setLoading(false)
      navigate('/recipes')
    
  }

  const handleChangeIngredients = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleFileChange=(e)=>{
    const selected = e.target.files[0]
    setFile(selected)
    if(selected){
      setPreview(URL.createObjectURL(selected))
    }
  }
  
  //console.log("zsidó zisa sdoiaiud a", user)

  return (

    <div className='addnewRecipes'>
      <h1 style={{ textAlign: "center", marginBottom:"10px" }}>új recept feltöltése</h1>
      <form className='newrecipeForm' onSubmit={handleSubmit}>

        <input type="text" style={{border:'2px solid black', margin:'5px', width:"200px", height:"25px"}} placeholder='receptneve' value={name} onChange={(e) => setName(e.target.value)} required />
        <div >
          {ingredients.map((item, index) =>
            <div key={index}>
              <input style={{border:'2px solid black', margin:"0.5px", width:"200px", height:"25px"}} type="text" value={item} onChange={(e) => handleChangeIngredients(index, e.target.value)} placeholder={`${index + 1}. hozzávaló: `} />
            </div>
          )}
          <div style={{marginTop:"4.5px",margin:"0.5px", width:"200px", height:"25px", display:"flex", justifyContent:"center", fontSize:"25px"}}>
            <FaPlus style={{backgroundColor:"white", borderRadius:"50%", border:"2px solid black"}} onClick={() => setIngredients([...ingredients, ""])} />
          </div>
          
        </div>

        <textarea style={{border:'2px solid black', margin:"0.5px", marginBottom:"5px", width:"250px", height:"75px"}} value={steps} onChange={(e) => setSteps(e.target.value)} placeholder='Elkészítés lépései' required></textarea>

        <input style={{border:'2px solid black', margin:"0.5px", width:"200px", height:"25px"}} type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Kategória: ' required />
        
        <label htmlFor="file-upload" className='custom-file-upload'>Kép feltöltése</label>
        <input id="file-upload" style={{marginTop:"6px", marginBottom:"5px", width:"250px", height:"25px"}} type="file" accept='image/*' onChange={handleFileChange}/>

        {preview && <img src={preview} alt='előnézet' style={{maxWidth:"200px", maxHeight:"200", objectFit:"cover", marginBottom:"5PX", border:"2px solid black"}}/>}

        <button style={{border:'2px solid black', margin:"0.5px", width:"200px", height:"25px", backgroundColor:"white", cursor:"pointer"}} type='submit' disabled={loading || (!file&& !preview)}>Mentés</button>
      </form>
      {loading&&<div>Loading...</div>}
      <IoMdClose onClick={() => navigate("/recipes")} style={{ position: "absolute", top: "5px", left: "5px" }} />
    </div>
  )
}