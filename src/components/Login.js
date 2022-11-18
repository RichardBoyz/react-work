import React, { useEffect, useRef, useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { login } from "../apis/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const cookies = new Cookies();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, resetUsername, userAttribute] = useInput("username", "");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // get auth
      const response = await login({ username: username, password });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const name = response?.data?.name; // 要改成fullname
      const refreshToken = response?.data?.refreshToken;
      setAuth({ username, password, name, accessToken, refreshToken });
      cookies.set("jwt-access", accessToken, { path: "/" });
      cookies.set("jwt-refresh", refreshToken, { path: "/" });
      // setUsername("");
      resetUsername();
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      // err
      if (!err.response) {
        setErrorMessage("伺服器無回應");
      } else if (err.response.status === 400) {
        setErrorMessage("帳號或密碼錯誤");
      } else if (err.response?.status === 401) {
        setErrorMessage("帳號或密碼錯誤");
      } else {
        setErrorMessage("登入失敗");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="sign-layout login-layout">
      <div className="sign-card">
        <p
          ref={errRef}
          className={errorMessage ? "error-message" : "off-screen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <h1>好欸有囉</h1>
        <form className="form-layout" onSubmit={handleSubmit}>
          <label htmlFor="username">帳號 : </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            {...userAttribute}
            required
          />
          <label htmlFor="username">密碼 : </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="sign-in-button">登入</button>
          <div className="persist-check">
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist">信任這個裝置</label>
          </div>
          <div className="to-sign-up">
            阿是沒有帳號?
            <span>
              <Link to="/register">註冊在這bang</Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
