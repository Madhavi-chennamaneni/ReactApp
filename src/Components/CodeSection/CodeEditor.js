import React from "react";
// import { render } from "react-dom";
import AceEditor from "react-ace";
import { useState } from "react";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/ext-language_tools";
// import { propTypes } from "react-ace-editor";

const CodeEditor = (Props) => {

  function onChange(newValue) {
    console.log("change", newValue);
    Props.codeChange(newValue)
  }
  const [theme, setTheme] = useState('tomorrow_night');
  const [language, setLanguage] = useState('java');
  const [value, setValue] = useState(`public class Main {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
  }`);

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
      setLanguage('java');
      setValue(`public class Main {
        public static void main(String[] args) {
          System.out.println("Hello World");
        }
      }`)
    } else if (languageOption === 'JavaScript') {
      setLanguage('javascript');
      setValue(`function onLoad(editor) {
        console.log("i've loaded");
      }`)
    } else {
      setLanguage('python')
      setValue(`print("Hello, World!")`)
    }
  }

  return (
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
          <select id="language" onChange={changeLanguage}>
            <option>Java</option>
            <option>JavaScript</option>
            <option>C/C++</option>
          </select>
        </div>
      </div>
      <AceEditor
        id="editor"
        width="100%"
        height="100vh"
        mode={language}
        theme={theme}
        value={Props.UserCode}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
      <button className="runBtn" onClick={Props.getOutput}>Run Code</button>
    </div>
  );
};

export default CodeEditor;
