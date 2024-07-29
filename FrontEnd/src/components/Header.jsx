
import {Link} from 'react-router-dom'
import Logo from '../assets/img/logo.svg'
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from "axios"


const Header = () => {
  const [user, setUser] = useState(null)
  const [userDropDownIsOpen, setUserDropDownIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])


  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      localStorage.removeItem('reloaded');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  


  return (
    <header className='py-6 mb-12 border-b'>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"><img src={Logo} alt="" /></Link>
        <div className='flex items-center gap-6'>
          {
            user ? (
                <>
                  <Link className='hover:text-violet-900 transtion' onClick={logout} >Log Out</Link>
                  <div>
      {/* Desktop Menu */}
      <ul className="hidden items-center gap-4 sm:flex">

        {/* User Pic */}
        <li className="relative flex items-center">
          <button
            onClick={() => setUserDropDownIsOpen(!userDropDownIsOpen)}
            aria-expanded={userDropDownIsOpen}
            className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:focus-visible:outline-blue-600"
            aria-controls="userMenu"
          >
            {
              user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="User Profile"
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9j-C3_YS7NAVZT4572tFatGX80YHRePaPNUnbLmlRWrSPgeqbeaj1mMd0F5IgW_G8_A"
                  alt="User Profile"
                  className="size-10 rounded-full object-cover"
                />
              )
            }
          </button>
          {/* User Dropdown */}
          <Transition
            show={userDropDownIsOpen}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ul
              id="userMenu"
              className="absolute right-0 top-12 flex w-full min-w-[12rem] flex-col overflow-hidden rounded-xl border border-slate-300 bg-slate-100 py-1.5 dark:border-slate-700 dark:bg-violet-800"
              onClick={() => setUserDropDownIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setUserDropDownIsOpen(false);
                }
              }}
            >
              <li className="border-b border-slate-300 dark:border-slate-700">
                <div className="flex flex-col px-4 py-2">
                  <span className="text-sm font-medium text-black dark:text-white">{user.username}</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 truncate " title={user.email}>
                    {user.email}
                  </p>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white"
                >
                  Subscription
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white"
                  onClick={logout}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        aria-expanded={mobileMenuIsOpen}
        className={`flex text-slate-700 dark:text-slate-300 sm:hidden ${mobileMenuIsOpen ? 'fixed top-6 right-6 z-20' : ''}`}
        aria-label="mobile menu"
        aria-controls="mobileMenu"
      >
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          aria-hidden="true"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          style={{ display: mobileMenuIsOpen ? 'none' : 'block' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          aria-hidden="true"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          style={{ display: mobileMenuIsOpen ? 'block' : 'none' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuIsOpen}
        enter="transition ease-out duration-300"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-out duration-300"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <ul
          id="mobileMenu"
          className="fixed max-h-svh overflow-y-auto inset-x-0 top-0 z-10 flex flex-col rounded-b-xl border-b border-slate-300 bg-slate-100 px-8 pb-6 pt-10 dark:border-slate-700 dark:bg-violet-800 sm:hidden"
          onClick={() => setMobileMenuIsOpen(false)}
        >
          <li className="mb-4 border-none">
            <div className="flex items-center gap-2 py-2">
              <img
                src="https://penguinui.s3.amazonaws.com/component-assets/avatar-8.webp"
                alt="User Profile"
                className="size-12 rounded-full object-cover"
              />
              <div>
                <span className="font-medium text-black dark:text-white">{user.username}</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">alice.brown@gmail.com</p>
              </div>
            </div>
          </li>
          {/* Repeat mobile menu items */}
          <li>
            <a href="#" className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white">
              Subscription
            </a>
          </li>
          <li>
            <a href="#" className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/10 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white">
              Sign Out
            </a>
          </li>
        </ul>
      </Transition>
    </div>
                </>
            ) : (
                <>
                  <Link className='hover:text-violet-900 transtion'  to="/login">Log In</Link>
                  <Link className='bg-violet-700 
                  hover:bg-violet-800 
                  text-white px-4 py-3 rounded-lg
                    transition' to="/signup">Sign Up</Link>
                </>
            )
            }
          
        </div>
      </div>
    </header>
  )
}

export default Header