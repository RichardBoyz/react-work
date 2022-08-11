import React, { useEffect, useRef, useState } from "react";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password, success);
    setUser("");
    setPassword("");
    setSuccess(true);
    console.log(user, password, success);
  };

  return (
    <>
      <p
        ref={errRef}
        className={errorMessage ? "error-message" : "off-screen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
          <h1>登入</h1>
          <form className="form-layout" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
            <label htmlFor="username">Password: </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="sign-in-button">登入</button>
            <div className="to-sign-up">
              阿是沒有帳號?
              <span>
                <a href="#">註冊在這bang</a>
              </span>
            </div>
      </form>
    </>
  );
};

export default Login;
