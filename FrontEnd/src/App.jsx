import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PropertyAddPage from './pages/PropertyAddPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/login/success', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
          // Check if the page has already been reloaded
          if (!localStorage.getItem('reloaded')) {
            localStorage.setItem('reloaded', 'true');
            window.location.reload();
          }
        } else {
          throw new Error('Authentication has failed!');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header user={user}/> 
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/property/:id' element={<PropertyDetails />}/>
        <Route path='/login' element={user ? <Navigate to='/'/> : <Login />}/>
        <Route path='/signup' element={user ? <Navigate to='/'/> : <SignUp />}/>
        <Route path='/create-property' element={<PropertyAddPage />}/>
      </Routes>
      <Footer /> 
    </div>
  );
};

export default App;
