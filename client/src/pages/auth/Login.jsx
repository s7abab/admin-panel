import React, { useState } from "react";
import Api from "../../services/API";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await Api.post("/api/v1/auth/login", {
      username: username,
      password: password,
    }).catch((res)=>window.alert("invalid crediatial")).then(res=>{
      cookies.set("token", res.data.token, {expires : 7})
      navigate("/",{replace:true});
    })
  };
  return (
    <>
      <div className="flex  justify-center h-screen items-center">
        <div className="border-solid border-2 p-10">
          <form onSubmit={handleLogin}>
          <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="flex items-start mb-6">
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Not registred?
                <a
                  href="/register"
                  className="text-blue-600 hover:underline dark:text-blue-500 p-2"
                >
                  Go to Register page
                </a>
              </label>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login your account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
