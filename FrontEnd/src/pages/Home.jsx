import { useEffect } from 'react';
import Banner from '../components/Banner'
import HouseList from '../components/HouseList'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("useEffect triggered");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');
    console.log('Token from URL:', token);
    console.log('User from URL:', user);

    if (token) {
        localStorage.setItem('jwt', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if (user) {
        localStorage.setItem('user', user);
    }
    navigate('/');
    
}, [navigate]);

  return (
    <div className='min-h-[1800px]'>
      <Banner />
      <HouseList />
    </div>
  )
}

export default Home