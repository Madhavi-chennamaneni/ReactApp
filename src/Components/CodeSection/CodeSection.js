import React, { useState, useEffect } from "react";
import "./editorPage.css";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import Problems from "./Problems";
import Split from "react-split";
import { useNavigate } from "react-router-dom";
import  apiCall  from "../../util";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";

const sample = require("../../model/sample.json");
const data = sample.data.map((data) =>
  data.complexity.map((complexity) =>
    complexity.questions.map((questions) => questions)
  )
);
// console.log(data);
// console.log(data.map(data=>data.data.map(data=>data.complexity.map(complexity=>complexity.questions.map(questions=>questions.id)))));

const CodeSection = (Props) => {
  // const [status, setStatus] = useState(false);
  const [clickRun, setClickRun] = useState(false);
  // const [type, setType] = useState("");
  // const [title, setTitle] = useState("");
  // const [quote, setQuote] = useState("");
  /* Problems */

  /* Output */
  var [UserCode, SetUserCode] = useState(``);
  var [language, SetLanguage] = useState(``);
  var [QuestionId, SetQuestionId] = useState(``);
  var [CodeOutput, SetCodeOutput] = useState(``);

  const addGrade = (score)=>{
    Props.addGrades(score)
  }

  function codeChange(NewValue, language, id) {
    SetUserCode(NewValue);
    SetQuestionId(id);
    SetLanguage(language);
  }

  let runUserCode=()=> {
    setClickRun(true)
    var specs={};
    specs.method="post";
    specs.api="runcode";
    specs.language=language;
    specs.body = {
      code: UserCode,
      language: language,
      questionid: QuestionId,
      custominput: custominp,
    }
    
    apiCall(specs) 
    // .then((result) => result.json())
    .then(result=>{SetCodeOutput(result);console.log(result)})
    .catch((error) => {
      SetCodeOutput(error);
    });
   
  }

  const [problems, setProblems] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [custominp, setcustominp] = useState("");

  const custominput = (text) => {
    setcustominp(text);
  };

  const handleSubmit = (language, id) => {

    setClickRun(true)
    var specs={};
    specs.method="post";
    specs.api="submitcode";
    specs.language=language;
    specs.body = {
      code: UserCode,
      language: language,
      questionid: QuestionId,
      custominput: custominp,
    }
    
    apiCall(specs) 
    // .then((result) => result.json())
    .then(result=>{SetCodeOutput(result);console.log(result)})
    .catch((error) => {
      SetCodeOutput(error);
    });

  };


  const autoSubmit = () => {
    if (index < problems.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/home");
    }
  };

  const handleClose = () => Props.setShow(false);

  useEffect(() => {
    if(!Props.isAdmin){
    const onBlur = () => {
      Props.setShow(true);
      Props.setAlertBodyText(
        "You have navigated from this page.So, we will give another qns for you"
      );
      // setStatus(true);
      // setType("warning");
      // setTitle("Warning");
      // setQuote("You have navigated from this page.So, we give a another qns for you");
      // autoSubmit();
    };
    // window.addEventListener("focus", onFocus);
    // window.addEventListener("blur", onBlur);

    return () => {
      // window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };}
  });
  useEffect(() => {
    if(!Props.isAdmin){
    const timer = setInterval(() => {
      if (Props.seconds > 0) {
        Props.setSeconds(Props.seconds - 1);
      } else {
        clearInterval(timer);
        Props.setShow(true);
        Props.setAlertBodyText("You have reached your timelimit");
        // autoSubmit();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };}
  }, [Props.seconds]);

  return (
    <div>
      {!Props.isAdmin&&<Modal
        show={Props.show}
        onHide={handleClose}
        backdrop="static" size="mg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="warning">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="warning">{Props.alertBodyText}</Modal.Body>
      </Modal>}
      {clickRun === true ? (
        <>
          <Split direction="horizontal" className="main-container">
            <Problems data={Props.question} />
            <CodeEditor
              UserCode={UserCode}
              SetUserCode={SetUserCode}
              codeChange={codeChange}
              runUserCode={runUserCode}
              handleSubmit={handleSubmit}
              data={Props.question}
              setClickRun={setClickRun}
              isAdmin={Props.isAdmin}
              addGrade={addGrade}
            />
            <OutputWindow
              CodeOutput={CodeOutput}
              handleSubmit={handleSubmit}
              data={Props.question}
            />
          </Split>
        </>
      ) : (
        <>
          <Split direction="horizontal" className="main-container">
            <Problems data={Props.question} />
            <CodeEditor
              UserCode={UserCode}
              SetUserCode={SetUserCode}
              codeChange={codeChange}
              custominput={custominput}
              runCode={runUserCode}
              handleSubmit={handleSubmit}
              data={Props.question}
              isAdmin={Props.isAdmin}
              addGrade={addGrade}
            />
          </Split>
        </>
      )}
    </div>
  );
};

export default CodeSection;