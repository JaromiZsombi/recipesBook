import React from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router';
import { CiCirclePlus } from "react-icons/ci";
import { addRecipe } from '../myBackend';

export const RecipesForm = () => {

  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([""])
  const [steps, setSteps] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let inputData = {name, ingredients, steps, category}
    console.log(inputData);
    await addRecipe(inputData, file)
    setLoading(false)
    
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
  

  return (

    <div className='addnewRecipes'>
      <h1 style={{ textAlign: "center" }}>új recept feltöltése</h1>
      <form className='newrecipeForm' onSubmit={handleSubmit}>

        <input type="text" style={{border:'2px solid black', margin:'5px', width:"200px", height:"25px"}} placeholder='receptneve' value={name} onChange={(e) => setName(e.target.value)} required />
        <div >
          {ingredients.map((item, index) =>
            <div key={index}>
              <input style={{border:'2px solid black', margin:"0.5px", width:"200px", height:"25px"}} type="text" value={item} onChange={(e) => handleChangeIngredients(index, e.target.value)} placeholder={`${index + 1}. hozzávaló: `} />
            </div>
          )}
          <CiCirclePlus style={{marginTop:"4.5px",margin:"0.5px", width:"200px", height:"25px"}} onClick={() => setIngredients([...ingredients, ""])} />
        </div>
        <textarea style={{border:'2px solid black', margin:"0.5px", marginBottom:"5px", width:"250px", height:"75px"}} value={steps} onChange={(e) => setSteps(e.target.value)} placeholder='Elkészítés lépései' required></textarea>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Kategória: ' required />
        <input type="file" accept='image/*' onChange={handleFileChange}/>
        {preview && <img src={preview} alt='előnézet' style={{maxHeight:200, objectFit:"cover"}}/>}
        <button type='submit'>Mentés</button>
      </form>
      {loading&&<div>Loading...</div>}
      <IoMdClose onClick={() => navigate("/recipes")} style={{ position: "absolute", top: "5px", left: "5px" }} />
    </div>
  )
}