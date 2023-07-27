import React from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let val;
  try {
    val = jwtDecode(Cookies.get("token"));
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Image Gallery
            </span>
          </Link>
          
          {val?.role === "admin" ? (
             <button
             onClick={() => {
               navigate("/admin");
             }}
             className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
           >
             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
               ADMIN PANEL
             </span>
           </button>
          ) :null}
          <button
              onClick={() => {
                Cookies.remove("token");
                navigate("/login", { replace: true });
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                LOGOUT
              </span>
            </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
