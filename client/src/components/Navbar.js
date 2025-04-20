import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FaRegUser } from "react-icons/fa";
import "../styles/Navbar.css";
import {Outlet} from "react-router-dom";

function Navbar() {
  return (
      
<div className="bb" >
<nav className=" navi border-gray-200 dark:bg-black">
  <div className="pl max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://api.logo.com/api/v2/images?logo=lg_5JDw2uzW2XfN5CF4i3&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=2024-11-24T14%3A49%3A31.874Z" className="logo h-8" alt="Flowbite Logo" />
      <img src="https://api.logo.com/api/v2/images?logo=lg_UttzNqNBsjVtLmsK4o&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=2024-11-24T12%3A58%3A07.320Z" className="vc h-5 mt-[07px]" alt="Flowbite Logo" />
  </a>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex text-sm  ">
                    <FaRegUser className="user h-[23px] w-6 text-gray-400   " />
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    {!localStorage.getItem("token") ? (
                      <>
                        <button
                          
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Your Profile
                        </button>
                      </>
                    ) : (
                      <button
                        
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    <button
                      
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
      
      
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  <button id="#1" className="f3a1" >
                  <span className="f3a1a">About Me</span>
                </button>
              
              <button id="#2" className="f3b1" >
                <span className="f3b1a">Experiences</span>
              </button>
              <button id="#3" className="f3b2" >
                <span className="f3c1a">Recommended</span>
              </button>
  </div>
  </nav>
<Outlet /> 

</div>
)
}

export default Navbar;