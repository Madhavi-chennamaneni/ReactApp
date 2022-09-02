import React from "react";
import AceEditor from "react-ace";
import { useState, useEffect } from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = (Props) => {
  const templatecode = Props.data.questions[0].templatecode.map(
    (templatecode) => templatecode
  );

  function onChange(newValue) {
    console.log(newValue);
    setValue(newValue);
    Props.codeChange(newValue, language, Props.data.questions[0].id);
  }
  const [theme, setTheme] = useState("github");
  const [language, setLanguage] = useState("");
  const [value, setValue] = useState("");
  const [customInput, setCustomInput] = useState("");

  const changeTheme = () => {
    let themeOption = document.getElementById("theme").value;
    if (themeOption === "Light") {
      setTheme("github");
    } else if (themeOption === "Dark") {
      setTheme("tomorrow_night");
    } else {
      setTheme("gruvbox_dark_hard");
    }
  };

  let getTemplatecode = (language) => {
    let languagedata = templatecode.filter(
      (question) => question.langname == language
    );
    if (languagedata.length >= 1) {
      setLanguage(languagedata[0].langname);
      setValue(languagedata[0].code);
    } else {
      setLanguage(languagedata.langname);
      setValue(languagedata.code);
    }
  };

  const changeLanguage = () => {
    let languageOption = document.getElementById("language").value;
    getTemplatecode(languageOption);
  };

  useEffect(() => {
    let languageOption = document.getElementById("language").value;
    getTemplatecode(languageOption);
  },[]);

  const changeCustomInput = (e) => {
    setCustomInput(e.target.value);
    Props.custominput(e.target.value);
  };

  const customInputArea = () => {
    const checkBox = document.getElementById("checkBox");
    const customInputArea = document.getElementById("customInputArea");
    const textArea = document.createElement("textarea");
    if (checkBox.checked === true) {
      textArea.id = "textArea";
      customInputArea.appendChild(textArea);
    } else {
      let removeElement = document.getElementById("textArea");
      removeElement.remove();
    }
  };

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
              {templatecode.map((templatecode) => (
                <>
                  <option>{templatecode.langname}</option>
                </>
              ))}
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
          wrapEnabled={true}
          showPrintMargin={false}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: false }}
        />
        <div className="btnDiv">
          <button className="runBtn" onClick={() => Props.runUserCode(language)}>
            Run Code
          </button>
          <button
            className="submitBtn"
            onClick={() => {
              Props.handleSubmit(language, Props.data.id);
              // Props.setClickRun(false);
            }}
          >
            Submit Code
          </button>
        </div>
        <div className="customInputArea">
          <label htmlFor="customInput" className="customInputLabel">
            Custom Input
          </label>
          <textarea id="customInput" onChange={changeCustomInput} />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;