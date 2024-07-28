import { FaRegEye, FaGoogle  } from "react-icons/fa";
import cover_image from '../assets/img/houses/InteriorWallColors.jfif'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    //Function to initiate Google login
    const google = () => {
        window.open('http://localhost:5000/auth/google','_self')
    }

    //Capture the token form the Url
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token =  urlParams.get('token')

        if( token ) {
            localStorage.setItem('jwt', token)
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const respone = await axios.post('http://localhost:5000/auth/login', { email, password })
            if( respone.status === 200 ) {
                localStorage.setItem('jwt', respone.data.token)
                navigate('/')
            } else {
                alert('Login failed!')
            }
        } catch (error) {
            console.error('Error logging in:', error)
            alert('Login failed!')
        }
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
                <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center mb-20'>
                    <div className='md:w-1/2 px-16'>
                        <h2 className='font-bold text-2xl text-violet-500'>Login</h2>
                        <p className='text-sm mt-4 text-violet-500'>If you are already a member, easily log in</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                            <input 
                                type="email" 
                                className='p-2 mt-8 rounded-xl border' 
                                name='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className='relative'>
                                <input 
                                    type="password" 
                                    className='p-2 mt-8 rounded-xl border w-full' 
                                    name='password' 
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <FaRegEye className="absolute top-1/2  right-2 translate-y-1/2 text-gray-500" />
                            </div>
                            <button type="submit" className='bg-violet-700 text-white py-2 rounded-xl hover:scale-105 duration-300'>Login</button>
                        </form>

                        <div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
                            <hr className='border-gray-400'/>
                            <p className='text-center text-sm'>OR</p>
                            <hr className='border-gray-400'/>
                        </div>

                        <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center hover:scale-105 duration-300"
                            onClick={google}
                        >
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Login With Google
                        </button>
                        <div className="mt-5 text-xs border-b border-gray-400 py-4 ">
                            <a href="">
                                Forgot Your Password?
                            </a>
                        </div>
                        <div className="mt-3 text-sm flex  justify-between items-center border-gray-500">
                            <p>IF You Don't have An Account?</p>
                            <button className="py-2 px-5 bg-white rounded-xl border hover:scale-105 duration-110">Register</button>
                        </div>
                    </div>
                    <div className='w-1/2 md:block hidden'>
                        <img className='rounded-2xl' src={cover_image} alt="Loding Image" />       
                        {/* <img className=" rounded-2xl " src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Login" /> */}
                    </div>
                </div>
        </section>
        
    )
}

export default Login