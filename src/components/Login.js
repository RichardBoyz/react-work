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

  return (
    <>
      <p
        ref={errRef}
        className={errorMessage ? "error-message" : "off-screen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        ></input>
      </form>
    </>
  );
};

export default Login;
