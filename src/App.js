
import logo from './logo.svg';
import './App.css';
import camera from './Camera';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Problems from './Problems';
import CodeEditor from './CodeEditor'
import OutputWindow from './OutputWindow'
import Footer from './Footer';
import axios from 'axios';


function App() {
  const [Loginstatus, setLoginStatus] = useState(false);

  const [Gotres, setGotres] = useState(false);
  const [ResData, setResData] = useState("");
  // camera.startCamera();
<<<<<<< HEAD

  function isAuthorizedUser(email) {
    //if(email == "madhavi.c@gradious.com"){
    setLoginStatus(true);
    //}
=======
  
  function isAuthorizedUser(email) {
    if (email == "madhavi.c@gradious.com") {
      setLoginStatus(true);
    }
>>>>>>> 3c0826b1b0f17786511933e9de58f9dc9641b860
  }
  useEffect(() => {

    /* global google*/

    google.accounts.id.initialize({
      client_id: "197504797372-j73fmcvfadrrqokndu07vat9eobuh6sj.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
    function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      /*global jwt_decode*/
      const responsePayload = jwt_decode(response.credential);
      console.log("ID: " + responsePayload.sub);
      console.log('Full Name: ' + responsePayload.name);
      // document.getElementById("name").innerText = responsePayload.name;
      console.log('Given Name: ' + responsePayload.given_name);
      console.log('Family Name: ' + responsePayload.family_name);
      console.log("Image URL: " + responsePayload.picture);
      //document.getElementById('profile').innerHTML = `<img src="${responsePayload.picture}" class="profile">`;
      console.log("Email: " + responsePayload.email);

      isAuthorizedUser(responsePayload.email);

    }
<<<<<<< HEAD










    // const intervalId = setInterval(() => {
    //   camera.takeSnapshot(); setsent(true);
    // }, 5000);
    // return () => clearInterval(intervalId);


=======
>>>>>>> 3c0826b1b0f17786511933e9de58f9dc9641b860
  }, []);

  const getApiData = () => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ "code": "public class TestClass {public static void main(String[] args) {System.out.println(1+2);System.out.println(9+9);}}" })
    };
    fetch("https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.body)
          setGotres(true);
          setResData(result.body)
        },
        (error) => {
          console.log(error)
        }
      )
  };

  return (
    <div className="App">
      {!Loginstatus && <div id="buttonDiv"></div>}

<<<<<<< HEAD
      {Loginstatus && <Header />}
=======
      {Loginstatus && <Header />} 
>>>>>>> 3c0826b1b0f17786511933e9de58f9dc9641b860
      <div className='Content'>
        {Loginstatus && <Problems />}
        {Loginstatus && <CodeEditor />}
        {Loginstatus && <OutputWindow />}
      </div>
<<<<<<< HEAD

      {Gotres && <p>ResData</p>}
      {Loginstatus && <Footer />}

=======
      {Loginstatus && <Footer />}

      {Loginstatus && <Footer />}

      <button onClick={() => getApiData()}> get result</button>

      {Gotres && <p>ResData</p>}
>>>>>>> 3c0826b1b0f17786511933e9de58f9dc9641b860
    </div>
  );
}

export default App;