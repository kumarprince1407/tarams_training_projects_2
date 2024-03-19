import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const Login = () => {
  //passing page as a prop
  const app = initializeApp(firebaseConfig);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const page = location.pathname === "/login" ? true : false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);
  const auth = getAuth();

  console.log(auth);
  const ctaClickHandler = (e) => {
    e.preventDefault();
    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => setUserExist(true));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((error) => setIsEmailUsed(true));
    }

    // navigate("/dashboard");
  };
  useEffect(() => {
    setUserExist(false);
    setIsEmailUsed(false);
  }, [location]);
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  // const passwordOnChangeHandler = (e) => {
  //   setPassword(e.target.value);
  // };
  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page === true ? "Sign In" : "Register"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email"
          />
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            className="btn btn-danger btn-block"
            onClick={ctaClickHandler}
          >
            {page === true ? "Sign In" : "Register"}
          </button>
          <br />
          <br />
          {page === true ? (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              {<span style={{ color: "wheat" }}>Remember Me</span>}
              <label
                className="form-check-label text-white"
                htmlFor="flexCheckDefault"
              ></label>
            </div>
          ) : (
            ""
          )}
        </form>
        <br />
        <br />
        {isUserExist && (
          <p className="text-danger">
            Invalid credentials | Please enter correct values or Signup if you
            haven't created an account yet.
          </p>
        )}

        {isEmailUsed && (
          <p className="text-danger">
            Email already in use| Please sign up you using a different email
            address.
          </p>
        )}
        <div className="login-form-other">
          <div className="login-signup-now">
            {page === true ? "New to Netflix?" : "Existing User"} &nbsp;
            <Link className="" to={page === true ? "/register" : "/login"}>
              {page === true ? "Sign Up Now" : "Sign In"} &nbsp;
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;
