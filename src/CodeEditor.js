import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { propTypes } from "react-ace-editor";




const CodeEditor = (Props) => {

  function onChange(newValue) {
    console.log("change", newValue);
    Props.codeChange(newValue)
  }


  return (
    <div className="codeEditor">
      <div className="selector">
        <div className="selectTheme">
          <label>Change Theme</label>&nbsp;&nbsp;
          <select className="">
            <option>Light</option>
            <option>Dark</option>
            <option>High Contrast</option>
          </select>
        </div>
        <div className="selectLanguage">
          <label>Languages</label>&nbsp;&nbsp;
          <select>
            <option>Java</option>
            <option>JavaScript</option>
            <option>C/C++</option>
          </select>
        </div>
      </div>
      <AceEditor
        width="100%"
        height="100vh"
        mode="java"
        theme="github"
        value={Props.UserCode}
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />,
      <button className="runBtn" onClick={Props.getOutput}>Run Code</button>
    </div>
  );
};

export default CodeEditor;

