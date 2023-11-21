import { useState } from "react";
import banner from "../../image/banner1.jpg";
import classes from "./AuthForm.module.css";
import useInput from "../../component/hook/use-input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { api } from "../../api/api";
// form
const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // state for login
  const [messErr, setMessErr] = useState("");

  const {
    value: email,
    isValid: validEmail,
    errorMess: errEmail,
    hasError: errorEmail,
    handleChange: handleChangeEmail,
    inputBlur: blurEmail,
    reset: resetEmail,
  } = useInput("email");

  const {
    value: password,
    isValid: validPass,
    errorMess: errPass,
    hasError: errorPass,
    handleChange: handleChangePass,
    inputBlur: blurPass,
    reset: resetPass,
  } = useInput("password");

  const {
    value: name,
    isValid: validName,
    errorMess: errName,
    hasError: errorName,
    handleChange: handleChangeName,
    inputBlur: blurName,
    reset: resetName,
  } = useInput("string");

  const {
    value: phone,
    isValid: validPhone,
    errorMess: errPhone,
    hasError: errorPhone,
    handleChange: handleChangePhone,
    inputBlur: blurPhone,
    reset: resetPhone,
  } = useInput("phone");

  // switch mode
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetEmail();
    resetPass();
    resetName();
    resetPhone();
    setMessErr(null);
  };

  // valid form
  let formValid = false;

  // login
  if (isLogin) {
    if (validEmail && validPass) formValid = true;
    else formValid = false;
  }

  // sign in
  else {
    if (validName && validEmail && validPass && validPhone) formValid = true;
    else formValid = false;
  }

  // submit
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    if (!isLogin) {
      user.name = name;
      user.phone = phone;
      user.isAdmin = 2;
    }

    // login
    if (isLogin) {
      try {
        const res = await axios.post(api + "/login", user, {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN", user: res.data });
        navigate("/");
      } catch (err) {
        setMessErr(err.response.data.message);
      }
    }

    // sign up
    else {
      try {
        await axios.post(api + "/register", user, {
          withCredentials: true,
        });
        setIsLogin(true);
      } catch (err) {
        setMessErr(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <img className={classes.img} src={banner}></img>
      <section className={classes.auth}>
        <h1>{isLogin ? "Sign in" : "Sign Up"}</h1>
        <form onSubmit={handlerSubmit}>
          {!isLogin && (
            <div className={classes.control}>
              <input
                type="text"
                id="name"
                onChange={handleChangeName}
                placeholder="Full Name"
                onBlur={blurName}
                value={name}
              />
              {errorName && <p className={classes.error}>Name {errName}</p>}
            </div>
          )}
          <div className={classes.control}>
            <input
              type="text"
              id="email"
              onChange={handleChangeEmail}
              placeholder="Email"
              onBlur={blurEmail}
              value={email}
            />
            {errorEmail && <p className={classes.error}>{errEmail}</p>}
          </div>
          <div className={classes.control}>
            <input
              type="password"
              id="password"
              onChange={handleChangePass}
              placeholder="Password"
              onBlur={blurPass}
              value={password}
            />
            {errorPass && <p className={classes.error}>{errPass}</p>}
          </div>

          {!isLogin && (
            <div className={classes.control}>
              <input
                type="text"
                id="phone"
                onChange={handleChangePhone}
                placeholder="Phone"
                onBlur={blurPhone}
                value={phone}
              />
              {errorPhone && <p className={classes.error}>{errPhone}</p>}
            </div>
          )}
          <div className={classes.actions}>
            {messErr && <p className={classes.error}>{messErr}</p>}
            <button
              disabled={!formValid}
              className={classes.submit}
              type="submit"
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>
            <div>
              <span>{isLogin ? "Create an account?" : "Login?"}</span>
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Sign up" : "Click"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
