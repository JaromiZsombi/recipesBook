import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {

  const navigate = useNavigate()

  return (
      
      <div className='home'>
        <h1 className='title'>RecipeBook</h1>
        <button className='Gonb' onClick={() => navigate("/recipes")}>Főzz, posztolj, inspirálj!</button>
    </div>
  )
}