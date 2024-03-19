//Login.jsx
import React from "react";
import "./loginRegister.css";
import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import { useNavigate, Link } from "react-router-dom";

import Register from "./Register";
import HomePage from "./HomePage";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const history = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //When the user changes ang user/pwd state
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    console.log(user, pwd);
    let accessToken;
    try {
      const response = await axios.post("/login", {
        username: user,
        password: pwd,
      });
      if (response.status === 200) {
        ({ accessToken } = response.data);
      }

      //Store the token in local storage or cookies
      localStorage.setItem("accessToken", accessToken);

      setSuccess(true);
      navigate(`/home/${user}`);
    } catch (error) {
      setErrMsg("Invalid credentials");
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer2">
          {success ? (
            <section>
              <h1>You are logged In</h1>
              <br />
              <p>
                <a href="/">Logout</a>
                {/* Remove the link to the general sign-in page */}
              </p>
            </section>
          ) : (
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Sign In</h1>
              <form onSubmit={handleSubmit} className="loginRegisterForm">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user} //This makes it a controlled input
                  required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="login-input"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd} //This makes it a controlled input
                  required
                />
                <br />
                <button className="login-button">Sign In</button>
              </form>
              <p>
                Need an Account? <br />
                <span className="line">
                  <a href="/signup">Sign Up</a>
                </span>
              </p>
            </section>
          )}
        </div>
      </div>
      {/* <div className="footerContent">
        <footer> &copy; Tarams Technologies</footer>
      </div> */}
    </>
  );
};

export default Login;
