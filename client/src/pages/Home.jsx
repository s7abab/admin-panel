import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Api from "../services/API";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    Api
      .post("/api/v1/auth/tokenCheck", {
          token: Cookies.get("token")
      })
      .catch(() => {
        navigate("/login")
      }).then(res=>{
        console.log(res);
      })
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <Card />
      </div>
    </>
  );
}

export default Home;
