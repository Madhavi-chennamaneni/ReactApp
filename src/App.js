import logo from './logo.svg';
import './App.css';
import camera from './Camera';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Problems from './Problems';
import CodeEditor from './CodeEditor'
import OutputWindow from './OutputWindow'
import Footer from './Footer';


function App() {
  const [Loginstatus, setLoginStatus] = useState(false);

  // camera.startCamera();

  function isAuthorizedUser(email) {
    //if(email == "madhavi.c@gradious.com"){
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










    // const intervalId = setInterval(() => {
    //   camera.takeSnapshot(); setsent(true);
    // }, 5000);
    // return () => clearInterval(intervalId);


  }, []);



  return (
    <div className="App">
      {!Loginstatus && <div id="buttonDiv"></div>}

      {Loginstatus && <Header />}
      <div className='Content'>
        {Loginstatus && <Problems />}
        {Loginstatus && <CodeEditor />}
        {Loginstatus && <OutputWindow />}
      </div>
      {Loginstatus && <Footer />}

    </div>
  );
}

export default App;
