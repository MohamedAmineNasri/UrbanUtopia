import { Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"


import Home from "./pages/Home"
import PropertyDetails from "./pages/PropertyDetails"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
const App = () => {
  const user = true
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header user={user}/> 
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/property/:id' element={<PropertyDetails />}/>
        <Route path='/login' element={user ? <Navigate to='/'/> : <Login />}/>
        <Route path='/signup' element={user ? <Navigate to='/'/> :<SignUp />}/>
      </Routes>
      <Footer /> 
    </div>
  )
}

export default App
