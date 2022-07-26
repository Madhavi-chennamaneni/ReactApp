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
import Split from 'react-split';

function App() {
  const [Loginstatus, setLoginStatus] = useState(false);
  const [Gotres, setGotres] = useState(false);
  var [UserCode, SetUserCode] = useState(``);
  var [CodeOutput, SetCodeOutput] = useState(``);

  function codeChange(NewValue) {
    SetUserCode(NewValue)
  }
  // camera.startCamera();
  function isAuthorizedUser(email) {
    //if (email == "msparth89@gmail.com") {
      setLoginStatus(true);
    //}
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

      SetUserCode(`public class TestClass
      {
          public static void main(String[] args) 
          { 
          //start here
          
          }
      }`)

    }
  }, []);


  function getOutput() {
    var code = UserCode.split("\n")
    for (var i = 0; i < code.length; i++) {
      code[i] = code[i].trim();
      code[i] = code[i].replace('//start here', "")
    }
    code = code.join('');
    getApiData(code)

  }

  const getApiData = async (code) => {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({ "code": code })
    };
    await fetch("https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          SetCodeOutput(JSON.parse(result.body).message)
        },
        (error) => {
          SetCodeOutput(error.message)
        }
      )
  };

  return (
    <div className="App">
      {!Loginstatus && <div id="buttonDiv"></div>}

      {Loginstatus && <Header />}

      {Loginstatus && <Split direction="horizontal" className='main-container'>
        {Loginstatus && <Problems />}
        {Loginstatus && <CodeEditor UserCode={UserCode} codeChange={codeChange} getOutput={getOutput} />}
        {Loginstatus && <OutputWindow CodeOutput={CodeOutput} />}
      </Split>}
      {Loginstatus && <Footer />}

    </div>
  );
}

export default App;
