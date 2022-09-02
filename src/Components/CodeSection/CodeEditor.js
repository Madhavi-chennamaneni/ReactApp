import React from "react";
import AceEditor from "react-ace";
import { useState, useEffect, useRef } from "react";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = (Props) => {

  let templatecode = null;
  if (!Props.isAdmin) {
    templatecode = Props.data[0].templatecode.map(
      (templatecode) => templatecode);
  }

  function onChange(newValue) {
    console.log(newValue);
    setValue(newValue);
    Props.codeChange(newValue, language, Props.data.questions[0].id);
  }
  const [theme, setTheme] = useState("github");
  const [language, setLanguage] = useState("");
  const [value, setValue] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [score,setScore] =useState(Props.data[0].score)

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const changeScore = (e)=>{
    console.log(e.target.value)
    setScore(e.target.value)
  }

  const addGrade = (score)=>{
    Props.addGrade(score)
  }

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
    if (!Props.isAdmin) {
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
    }
  };

  const changeLanguage = () => {
    let languageOption = document.getElementById("language").value;
    getTemplatecode(languageOption);
  };

  useEffect(() => {
    let languageOption = document.getElementById("language").value;
    getTemplatecode(languageOption);
    if (Props.isAdmin) {
      setValue(Props.data[0].answer)
    }
  }, []);

  const changeCustomInput = (e) => {
    setCustomInput(e.target.value);
    Props.custominput(e.target.value);
  };

  // const customInputArea = () => {
  //   const checkBox = document.getElementById("checkBox");
  //   const customInputArea = document.getElementById("customInputArea");
  //   const textArea = document.createElement("textarea");
  //   if (checkBox.checked === true) {
  //     textArea.id = "textArea";
  //     customInputArea.appendChild(textArea);
  //   } else {
  //     let removeElement = document.getElementById("textArea");
  //     removeElement.remove();
  //   }
  // };

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
              {!Props.isAdmin && templatecode.map((templatecode) => (
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
          <button className="runBtn" onClick={() => Props.runCode(language)}>
            Run Code
          </button>
          {!Props.isAdmin && <button
            className="submitBtn"
            onClick={() => {
              Props.handleSubmit(language, Props.data.id);
              // Props.setClickRun(false);
            }}
          >
            Submit Code
          </button>}
          {Props.isAdmin && (
            <>
              <div ref={ref}>
                <button className="addGradeBtn" onClick={handleClick}>Add Grade</button>
                <Overlay
                  show={show}
                  target={target}
                  placement="right"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Body style={{fontSize:'1.2rem',fontWeight:'500'}}>
                      <input className="grade" value={score} onChange={changeScore}/>/<input className="grade" defaultValue={Props.data[0].marks}/>&nbsp; 
                      <button className="btn btn-primary" onClick={()=>addGrade(score)}>Add</button>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
              <button className="reSubmissionBtn">Resubmission</button>
            </>
          )}
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
