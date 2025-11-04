import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/addnew" element={<RecipesForm />} />
    </Routes>
  )
}

export default App
