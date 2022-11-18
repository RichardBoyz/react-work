import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { test } from "../apis/api";
import useAxiosProvide from "../hooks/userAxiosPrivate";
import useLogout from "../hooks/useLogout";
import Navbar from "./Navbar";

function Home() {
  const logout = useLogout();
  const apiPrivate = useAxiosProvide();
  const navigate = useNavigate();
  const location = useLocation();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const handleClickLogin = async () => {
    try {
      const result = await apiPrivate.get("/test");
      console.log(result);
    } catch (error) {
      console.log(error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const backHandler = () => {};
  const handleGetRefreshToken = async () => {};
  return (
    <>
      <Navbar backHandler={backHandler} signOut={signOut} />
      <div className="home-content">
        <div className="home-content-left">
          <h1>這裡是</h1>
          <h2>一個測試網站</h2>
          <h3>給個機會大哥大姊</h3>
        </div>
        <div className="home-content-right">
          <button className="big-button" onClick={handleClickLogin}>
            測試
          </button>

          <button className="big-button" onClick={handleGetRefreshToken}>
            不知道
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
