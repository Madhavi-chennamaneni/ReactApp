import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import { useState,useEffect } from "react";
import Popup from 'reactjs-popup';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/ext-language_tools";


const CodeEditor = (Props) => {
  function onChange(newValue) {
    setValue(newValue);
    console.log("change", newValue);
    Props.codeChange(newValue)
  }
  const [theme, setTheme] = useState('github');
  const [language, setLanguage] = useState("");
  const [value, setValue] = useState("");

  useEffect(()=>{
    setValue(Props.data.boilerplate);
    console.log(Props.data.language);
    setLanguage(Props.data.language);
  },[])


  const changeTheme = () => {
    let themeOption = document.getElementById('theme').value;
    if (themeOption === 'Light') {
      setTheme('github')
    } else if (themeOption === 'Dark') {
      setTheme('tomorrow_night')
    } else {
      setTheme('gruvbox_dark_hard')
    }
  }

  const changeLanguage = () => {
    let languageOption = document.getElementById('language').value;
    if (languageOption === 'Java') {
      setLanguage('Java');
      setValue("")
    } else if (languageOption === 'JavaScript') {
      setLanguage('JavaScript');
      setValue(Props.data.boilerplate);
    } else {
      setLanguage('python')
      setValue("")
    }
  }

  const customInputArea = () => {
    const checkBox = document.getElementById('checkBox');
    const customInputArea = document.getElementById('customInputArea');
    const textArea = document.createElement('textarea');
    if (checkBox.checked === true) {
      textArea.id = 'textArea';
      customInputArea.appendChild(textArea)
    } else {
      let removeElement = document.getElementById('textArea')
      removeElement.remove();
    }
  }

  return (
    <>
      <div className="codeEditor">
        <div className="selector">
          <div className="selectTheme">
            <label>Change Theme</label>&nbsp;&nbsp;
            <select className="themes" id="theme" onChange={changeTheme}>
              <option>Light</option>
              <option>Dark</option>
              <option>High Contrast</option>
            </select>
          </div>
          <div className="selectLanguage">
            <label>Languages</label>&nbsp;&nbsp;
            <select id="language" value={language} onChange={changeLanguage}>
              <option>Java</option>
              <option>JavaScript</option>
              <option>Python</option>
            </select>
          </div>
        </div>
        <AceEditor
          id="editor"
          width="100%"
          height="100vh"
          mode={language}
          theme={theme}
          value={value}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <div className="btnDiv">
          <button className="runBtn" onClick={()=>{Props.getOutput(language,Props.data.id)}}>Run Code</button>
          <button className="submitBtn" onClick={()=>{Props.handleSubmit(language,Props.data.id)}}>Submit Code</button>
        </div>
        {/*  <div className="customInputArea">
          <label htmlFor="customInput" className="customInputLabel">Custom Input</label>
          <textarea id="customInput"/>
        </div> */}
      </div>
    </>
  );
};

export default CodeEditor;

