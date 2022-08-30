import { httpCall } from "./util";
import "./App.css";
import camera from "./Camera";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/LoginPage/LoginPage";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CodeSection from "./Components/CodeSection/CodeSection";
import Home from "./Components/Home/Home";
import QuestionsEntry from "./QuestionsEntry";
import Uploads from "./uploads";
//import executeCode from './util';

function App() {
  const [Loginstatus, setLoginStatus] = useState(false);
  const [Gotres, setGotres] = useState(false);
  var [UserCode, setUserCode] = useState(``);
  var [CodeOutput, setCodeOutput] = useState(``);
  const [seconds, setSeconds] = useState(null);
  const navigate = useNavigate();
  // function codeChange(NewValue) {
  //   setUserCode(NewValue);
  // }
  // camera.startCamera();
  function isAuthorizedUser(email) {
    //if (email == "msparth89@gmail.com") {
    localStorage.setItem("loggedin", "true");
    setLoginStatus(true);
    navigate("/home");
  }
  let [attedingquestion, setAttendingQuestion] = useState({});
  const [show, setShow] = useState(false);
  const [alertBodyText, setAlertBodyText] = useState("");
  function attendQuestion(row, time) {
    setSeconds(time * 60);
    setAttendingQuestion(row);
    setShow(true);
    setAlertBodyText(
      "If You navigate from this page, the question will submit automatically and we give another question for you"
    );
    // alert('If You navigate from this page, the question will submit automatically and we give another question for you')
    navigate("/coding");
  }

  useEffect(() => {
    if (
      localStorage.getItem("loggedin") === "false" ||
      localStorage.getItem("loggedin") === null
    ) {
      /* global google*/
      google.accounts.id.initialize({
        client_id:
          "197504797372-j73fmcvfadrrqokndu07vat9eobuh6sj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("signInBtn"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
      function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        /*global jwt_decode*/
        const responsePayload = jwt_decode(response.credential);
        console.log("ID: " + responsePayload.sub);
        console.log("Full Name: " + responsePayload.name);
        document.getElementById("logInName").innerText = responsePayload.name;
        console.log("Given Name: " + responsePayload.given_name);
        console.log("Family Name: " + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        document.getElementById(
          "logInProfile"
        ).innerHTML = `<img src="${responsePayload.picture}" class="logInProfile">`;
        console.log("Email: " + responsePayload.email);
        isAuthorizedUser(responsePayload.email);
      }
    }
  }, []);

  let executeCode = async (language, method, code) => {
    executeUserCode(language, method, code).then((result) => {
      setCodeOutput(result);
    });
  };

  function buildCodeForJava(UserCode) {
    var code = UserCode.split("\n");
    for (var i = 0; i < code.length; i++) {
      code[i] = code[i].trim();
      code[i] = code[i].replace("//write your code below", "");
    }
    code = code.join("");
    return code;
  }

  async function executeUserCode(language, method, code) {
    const payload = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (language === "Java") {
      //var javacode = buildCodeForJava(code);
      payload.body = JSON.stringify({ code: buildCodeForJava(code) });
      return new Promise((resolve, reject) => {
        httpCall(
          "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/evaluate/run",
          payload
        )
          .then((result) => {
            console.log("result is java " + result);
            resolve(result.body);
          })
          .catch((result) => {
            console.log("result is java  " + result);
            resolve(result.body);
          });
      });
    }

    if (language === "Javascript") {
      payload.body = JSON.stringify({ code: code });
      return new Promise((resolve, reject) => {
        httpCall("http://localhost:3005/api/javascript", payload)
          .then((result) => {
            console.log("result is js  " + result);
            resolve(result.body);
          })
          .catch((result) => {
            console.log("result is js   " + result);
            resolve(result.body);
          });
      });
    }
  }

  return (
    <div className="App">
      <Header
        seconds={seconds}
        setSeconds={setSeconds}
        question={attedingquestion}
      />
      {(localStorage.getItem("loggedin") === "false" ||
        localStorage.getItem("loggedin") === null) && <LoginPage />}

      <>
        {localStorage.getItem("loggedin") === "true" && (
          <Routes>
            <Route path="/" element={!Loginstatus && <LoginPage />} />
            <Route
              path="/home"
              element={<Home attendQuestion={attendQuestion} />}
            />
            <Route
              path="/coding"
              element={
                <CodeSection
                  question={attedingquestion}
                  seconds={seconds}
                  setSeconds={setSeconds}
                  show={show}
                  setShow={setShow}
                  alertBodyText={alertBodyText}
                  setAlertBodyText={setAlertBodyText}
                />
              }
            />
            <Route path="/questions" element={<QuestionsEntry />} />
            <Route path="/uploads" element={<Uploads />} />
          </Routes>
        )}
      </>
      <Footer />
    </div>
  );
}

export default App;
