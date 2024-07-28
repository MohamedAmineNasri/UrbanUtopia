import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cover_image from '../assets/img/houses/InteriorWallColors.jfif';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save the token and user details as needed
        console.log(data);
        // Redirect to login page or home page after successful signup
        navigate('/login');
      } else {
        // Handle errors (e.g., display an error message)
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error during registration:', err);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center mb-20'>
        <div className='md:w-1/2 px-16'>
          <h2 className='font-bold text-2xl text-violet-500'>Sign Up</h2>
          <p className='text-sm mt-4 text-violet-500'>Create your account</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" className='p-2 mt-8 rounded-xl border' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required />
            <input type="text" className='p-2 mt-4 rounded-xl border' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
            <input type="text" className='p-2 mt-4 rounded-xl border' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
            <input type="email" className='p-2 mt-4 rounded-xl border' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
            <input type="password" className='p-2 mt-4 rounded-xl border' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
            <button type='submit' className='bg-violet-700 text-white py-2 rounded-xl hover:scale-105 duration-300'>Sign Up</button>
          </form>
          <div className="mt-5 text-xs border-b border-gray-400 py-4">
            <a href="/login">Already have an account? Login</a>
          </div>
        </div>
        <div className='w-1/2 md:block hidden'>
          <img className='rounded-2xl' src={cover_image} alt="Signup Image" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
