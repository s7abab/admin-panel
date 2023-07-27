import React, { useEffect, useState } from "react";
import Api from "../services/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.css";
import AddUser from "./auth/AddUser";
import Navbar from "../components/Navbar";

function Admin() {
  //GET USERS
  const [users, setUsers] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [search, setSearch] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [createUser]);

  const fetchData = async () => {
    Api.get("/api/v1/admin/getusers", {
      params: { token: Cookies.get("token") },
    })
      .then((res) => {
        setUsers(res.data.users);
        setSearch(res.data.users);
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  };

  //DELETE USERS
  const handleDelete = async (index) => {
    try {
      let confirm = window.confirm("do you want to delete");
      if (confirm) {
        let temp = [...users];
        let user = temp[index];
        console.log("delete is working");
        await Api.delete("/api/v1/admin/deleteuser/" + user.username).then(() =>
          fetchData()
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //EDIT USERS
  const handleEdit = async (user) => {
    try {
      console.log(user);
      const { data } = await Api.put("/api/v1/admin/updateuser", {
        _id: user._id,
        username: editUser, // Use the state value editUser
        email: editEmail,
        role: editRole,
      });
      if (data.success) {
        console.log("User updated");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) =>
              setSearch(
                users.filter((x) => {
                  return x?.username
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase());
                })
              )
            }
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Users..."
          />

          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <br />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Si
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">
              <button
                className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                onClick={() => setCreateUser(!createUser)}
              >
                {" "}
                Add Users{" "}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {search?.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">{index + 1}</td>
              <td className="w-4 p-4">{item.username}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                {" "}
                <button
                  className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                  Nav
                  onClick={() => {
                    setCurrentUser(item);
                    setEditMode(!editMode);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {editMode ? (
        <div className="flex modal justify-center items-center">
          <div className="bg-slate-700 p-10">
            <form
              onSubmit={() => {
                handleEdit(currentUser);
              }}
            >
              <button
                className="text-white relative "
                onClick={() => setEditMode(!editMode)}
              >
                X
              </button>
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
                  onChange={(e) => setEditUser(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder=""
                  required
                />
              </div>
              <div className="flex flex-wrap">
                <div className="flex items-center mr-4">
                  <input
                    id="red-radio"
                    type="radio"
                    value="user"
                    onChange={(e) => setEditRole(e.target.value)}
                    name="colored-radio"
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="red-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    USER
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="green-radio"
                    type="radio"
                    value="admin"
                    onChange={(e) => setEditRole(e.target.value)}
                    name="colored-radio"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="green-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ADMIN
                  </label>
                </div>
              </div>
              <br />
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                SAVE
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {createUser ? <AddUser close={setCreateUser} /> : null}
    </>
  );
}

export default Admin;
