//Register.jsx
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
import { useHistory, useNavigate } from "react-router-dom";

import Login from "./Login";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const PWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // const history = useHistory(); //Get the history object from React Router

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false); //Boolean state to check if username is valid or not
  const [userFocus, setUserFocus] = useState(false); //Boolean state to check if we have focus on that i/p field

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false); //Boolean state to check if username is valid or not
  const [pwdFocus, setPwdFocus] = useState(false); //Boolean state to check if we have focus on that i/p field

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false); //Boolean state to check if username is valid or not
  const [matchFocus, setMatchFocus] = useState(false); //Boolean state to check if we have focus on that i/p field

  const [errMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd, matchPwd]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //If button is enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrorMsg("Invalid entry");
      return;
    }

    console.log("Username: " + user + " Password:" + pwd);

    try {
      // Make a POST request to the registration endpoint
      const response = await fetch("http://localhost:3500/register", {
        // const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, password: pwd }),
      });

      if (response.ok) {
        setSuccess(true);

        //Redirect to the user's homepage after successful registration
        //  history.push(`/home/${user}`);
        //navigate(`/home/${user}`);
        navigate(`/`);
      } else {
        const data = await response.json();
        setErrorMsg(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMsg("Registration failed");
    }
  };
  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer2">
          {success ? (
            <section>
              <h1>Success!</h1>
              <p>
                <a href="/">SignIn</a>
                {/* Remove the link to the general sign-in page */}
              </p>
            </section>
          ) : (
            <section>
              <p
                ref={userRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Register</h1>
              <form onSubmit={handleSubmit} className="loginRegisterForm">
                <label htmlFor="username">
                  Username:
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username" //should mathch the htmlFor attaribute on the label
                  className="register-input"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  //This lets a screen reader whether the i/p field need to be adjusted
                  // before the form is submitted
                  aria-describedby="uidnote" // It provides another element that describes the input field
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <br />
                <label htmlFor="password">
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password" //should mathch the htmlFor attaribute on the label
                  className="register-input"
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  //This lets a screen reader whether the i/p field need to be adjusted
                  // before the form is submitted
                  aria-describedby="pwdnote" // It provides another element that describes the input field
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercasse letters, a number and a
                  special character. <br />
                  Allwed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percentage">%</span>
                </p>
                <br />
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirm_pwd" //should mathch the htmlFor attaribute on the label
                  className="register-input"
                  autoComplete="off"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  //This lets a screen reader whether the i/p field need to be adjusted
                  // before the form is submitted
                  aria-describedby="confirmnote" // It provides another element that describes the input field
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the password input field above.
                </p>
                <br />
                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                  className="register-button"
                >
                  Sign Up
                </button>
              </form>
              <p>
                Already registered?
                <br />
                <span className="line">
                  {/* put router link here */}
                  <a href="/">Sign In</a>
                </span>
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
