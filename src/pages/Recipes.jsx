import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { readRecipes } from '../myBackend';
import { RecipeCard } from '../components/RecipeCard';
import { useState } from 'react';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([])

  const { id } = useParams()

  id && console.log(id)

  const navigate = useNavigate()

  useEffect(() => {
    readRecipes(setRecipes)
  }, [])

  return (
    <div>
      <div className='recipesBase' style={{ minHeight: '100vh', padding: "20px", display: "flex", flexDirection: "column", justifySelf: "center" }}>
        <div className='recipesTitle' style={{ textAlign: 'center'}}>
          {recipes && recipes.length > 0 && recipes.map(obj => <RecipeCard key={obj.id} {...obj} />)}
          {recipes && recipes.length == 0 && <h4>Nincsenek receptek feltöltve</h4>}
        </div>
        <button onClick={() => navigate("/addnew")} style={{ position: "fixed", bottom: "5px", right: "5px" }}>Új receptek feltöltése</button>
      </div>
    </div>
  )
}