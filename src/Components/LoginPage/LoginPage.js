import React from "react";
import "./LoginPage.css";
import Header from "../Header/Header";

const LoginPage = () => {
  return (
    <>
    <Header />
    <form className="loginForm">
      <div className="tabs">Sign In</div>
      <div className="signInForm">
        <button id="signInBtn"> SignIn with google </button>
      </div>
    </form>
    </>
  );
};

export default LoginPage;
