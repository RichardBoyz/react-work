import React, { useEffect, useRef, useState } from "react";
import DropDownSelect from "./DropDownSelect";
import { signup } from "../apis/api";

import { Link, useNavigate, useLocation } from "react-router-dom";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^09[0-9]{8}/g;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Register() {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const WORK_SPACE = [122, 126];
  const FIELD_HINT = [
    "帳號格式錯誤\n",
    "密碼格式錯誤\n",
    "確認密碼格式錯誤\n",
    "電話請輸入正確格式 ex.09xx 或者空白\n",
    "信箱請輸入正確格式 或者空白\n",
    "全名格式錯誤\n",
    "暱稱格式錯誤\n",
    "工作地點格式錯誤\n",
  ];
  const [hintMessage, setHintMessage] = useState("");
  const [workSpace, setWorkSpace] = useState(122);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match);
    // console.log(
    //   `validPassword: ${validPassword}\t validMatchPassword: ${validMatchPassword}`
    // );

    setValidPassword(result);
  }, [password, matchPassword]);

  const handlePasswordOnBlur = () => {
    if (password) {
      // console.log(validPassword);
    }
  };

  const handleMatchPasswordOnBlur = () => {
    if (matchPassword) {
      // console.log(validMatchPassword);
    }
  };
  const handleNameOnBlur = (value, setValue) => {
    let replaced = value;
    replaced = replaced.replace(/[^\w\u4E00-\u9FA5]/g, "");
    setValue(replaced);
  };

  const handlePhone = () => {
    // 電話可以為空白，如果有值就要符合格式
    const result = !phone ? true : PHONE_REGEX.test(phone);
    // console.log(result);
    setValidPhone(result);
  };
  const handleEmail = () => {
    // 信箱可以為空白，如果有值就要符合格式
    const result = !email ? true : EMAIL_REGEX.test(email);
    // console.log(`email : ${result}`);
    setValidEmail(result);
  };
  const allFieldValid = () => {
    let fieldValidList = [
      validUsername,
      validPassword,
      validMatchPassword,
      validPhone,
      validEmail,
      fullName,
      nickName,
      workSpace,
    ];
    let tempFieldHintMessage = "";
    fieldValidList.forEach((fieldValidResult, index) => {
      if (!fieldValidResult) tempFieldHintMessage += "- " + FIELD_HINT[index];
    });

    setHintMessage(tempFieldHintMessage);

    return (
      validUsername &&
      validMatchPassword &&
      validPassword &&
      validPhone &&
      validEmail &&
      fullName &&
      nickName &&
      workSpace
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFieldValid()) return;

    try {
      const response = await signup({
        username,
        password,
        fullName,
        nickName,
        email,
        phone,
        workSpace,
      });
      console.log(response);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sign-layout">
      <div className="sign-card">
        <h1>這裡是註冊</h1>
        <form className="form-layout">
          <label htmlFor="username">帳號(必填) : </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="usernamenote"
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
            required
          />
          <p
            id="usernamenote"
            className={
              usernameFocus && username && !validUsername
                ? "input-remind"
                : "off-screen"
            }
          >
            {"4~24個字元， 只能英文或數字。"}
          </p>
          <label htmlFor="password">密碼(必填) : </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            aria-invalid={!validPassword}
            aria-describedby="passwordnote"
            required
          />
          <p
            id="passwordnote"
            className={
              password && !validPassword ? "input-remind" : "off-screen"
            }
          >
            {"8~24個字元， 必須有大小寫英文和數字。"}
          </p>
          <label htmlFor="matchPassword">確認密碼 : </label>
          <input
            type="password"
            id="matchPassword"
            autoComplete="off"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            onBlur={handleMatchPasswordOnBlur}
            required
          />
          <label htmlFor="fullName">全名(必填) : </label>
          <input
            type="text"
            id="fullName"
            autoComplete="off"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            onBlur={() => handleNameOnBlur(fullName, setFullName)}
            required
          />
          <label htmlFor="nickName">暱稱(必填) : </label>
          <input
            type="text"
            id="nickName"
            autoComplete="off"
            onChange={(e) => setNickName(e.target.value)}
            value={nickName}
            onBlur={() => handleNameOnBlur(nickName, setNickName)}
            required
          />
          <label htmlFor="phone">行動電話 : </label>
          <input
            type="tel"
            id="phone"
            autoComplete="off"
            onChange={(e) => {
              setPhone(e.target.value);
              handlePhone();
            }}
            value={phone}
            onBlur={handlePhone}
          />
          <label htmlFor="email">信箱 : </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
              handleEmail();
            }}
            value={email}
            onBlur={handleEmail}
          />
          <label htmlFor="email">工作地點 : </label>
          <DropDownSelect
            value={workSpace}
            setValue={setWorkSpace}
            options={WORK_SPACE}
          />
          <div className="padding-top-down">
            <button className="sign-up-button" onClick={handleSubmit}>
              註冊
            </button>
            <p
              className={
                hintMessage ? "input-remind input-remind-hint" : "off-screen"
              }
            >
              {hintMessage}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
