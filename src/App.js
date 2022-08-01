import logo from './logo.svg';
import './App.css';
import camera from './Camera';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Problems from './Problems';
import CodeEditor from './CodeEditor';
import OutputWindow from './OutputWindow';
import Footer from './Footer';
import axios from 'axios';
import Split from 'react-split';
import { executeUserCode,buildCodeForJava,httpCall } from './util';
//import executeCode from './util';

function App() {
  const [Loginstatus, setLoginStatus] = useState(false);
  const [Gotres, setGotres] = useState(false);
  var [UserCode, setUserCode] = useState(``);
  var [CodeOutput, setCodeOutput] = useState(``);

  function codeChange(NewValue) {
    setUserCode(NewValue);
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
    }
  }, []);

   async function executeCode(language,method,code)
  {

    await executeUserCode(language, method,code)
    .then((result)=>{setCodeOutput(result)});

  }

  function buildCodeForJava(UserCode) {
    var code = UserCode.split("\n");
    for (var i = 0; i < code.length; i++) {
        code[i] = code[i].trim();
        code[i] = code[i].replace('//write your code below', "");
    }
    code = code.join('');
    return code;
}


  async function executeUserCode(language, method,code) {
    const payload = {
      method: method,
      headers: {
          'Content-Type': 'text/plain',
      },
  };
    if (language == "java") {
        //var javacode = buildCodeForJava(code);

        payload.body=JSON.stringify({"code":buildCodeForJava(code)});
        return new Promise((resolve, reject) => {
            httpCall("https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta", payload)
                .then((result) => { console.log("result is    java " + result); resolve(result.body) })
                .catch((result) => { console.log("result is    java  " + result); resolve(result.body) });
        });
    }

    if (language == "javascript") {
     payload.body= JSON.stringify({ "code": code });
        return new Promise((resolve, reject) => {
            httpCall("http://localhost:3005/api/javascript", payload)
                .then((result) => { console.log("result is   js  " + result); resolve(result.body) })
                .catch((result) => { console.log("result is  js   " + result); resolve(result.body) });
        });
    }
}


  return (
    <div className="App">
      {!Loginstatus && <div id="buttonDiv"></div>}
      {Loginstatus && <Header />}
      {Loginstatus && <Split direction="horizontal" className='main-container'>
        {Loginstatus && <Problems />}
        {Loginstatus && <CodeEditor UserCode={UserCode} codeChange={codeChange} executeCode={executeCode} />}
        {Loginstatus && <OutputWindow CodeOutput={CodeOutput} />}
      </Split>}
      {Loginstatus && <Footer />}
    </div>
  );
}

export default App;
