import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { Recipes } from './pages/Recipes'
import { RecipesForm } from './pages/RecipesForm'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { MyHeader } from './components/MyHeader'

function App() {

  return (
    <div>
      <MyHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/addnew" element={<RecipesForm />} />
        <Route path="/edit/:id" element={<RecipesForm />}></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
    //const navigate = useNavigate()
    //Pl onClick={()=>navigate("/addnew")}
  )
}

export default App
