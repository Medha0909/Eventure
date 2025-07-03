import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaRegUser  } from "react-icons/fa";
import "../styles/Navbar.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("title1");
    localStorage.removeItem("title");
    localStorage.removeItem("uniqueId");
    navigate("/");
  };

  return (
    <div className="bb">
      <nav className="navi border-gray-200 dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://api.logo.com/api/v2/images?logo=lg_5JDw2uzW2XfN5CF4i3&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=2024-11-24T14%3A49%3A31.874Z"
              className="logo h-8"
              alt="Flowbite Logo"
            />
            <img
              src="https://api.logo.com/api/v2/images?logo=lg_UttzNqNBsjVtLmsK4o&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=2024-11-24T12%3A58%3A07.320Z"
              className="vc h-5 mt-[07px]"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex ml-[1070px] items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex text-sm">
                  <FaRegUser  className="user h-[23px] w-6 text-gray-400" />
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

           
          </div>
          <div className=" md:flex md:space-x-4">
            <a href="#foot">
              <button className="f3a1">
                <span className="f3a1a">About Us</span>
              </button>
            </a>
            <a href="#feedback">
              <button id="#feedback" className="f3b1">
                <span className="f3b1a">Experiences</span>
              </button>
            </a>
            <a href="#recommend">
              <button id="#3" className="f3b2">
                <span className="f3c1a">Recommended</span>
              </button>
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
