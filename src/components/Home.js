import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { test } from "../apis/api";
import useAxiosProvide from "../hooks/userAxiosPrivate";
import useLogout from "../hooks/useLogout";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import ActionSheet from "./ActionSheet";

function Home() {
  const logout = useLogout();
  const apiPrivate = useAxiosProvide();
  const navigate = useNavigate();
  const location = useLocation();
  const authInfo = useAuth();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const [isAction, setIsAction] = useState(false);
  const handleClickLogin = async () => {
    try {
      const result = await apiPrivate.get("/test");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const backHandler = () => {};
  const toggleAction = async () => {
    setIsAction(!isAction);
  };
  return (
    <>
      <Navbar backHandler={backHandler} signOut={signOut} />
      <div className="home-content">
        <div className="home-content-left">
          <h1>{authInfo.auth.name} 你好 這裡是</h1>
          <h2>一個測試網站</h2>
          <h3>給個機會大哥大姊</h3>
        </div>
        <div className="home-content-right">
          <button className="big-button" onClick={handleClickLogin}>
            <span className="button-text">測試</span>
          </button>

          <button className="big-button" onClick={toggleAction}>
            <span className="button-text">不知道</span>
          </button>
        </div>
      </div>
      {isAction ? (
        <ActionSheet closeAction={toggleAction}>
          <div>123</div>
        </ActionSheet>
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;
