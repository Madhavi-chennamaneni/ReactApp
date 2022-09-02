import React, { useState, useEffect } from "react";
import "./editorPage.css";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import Problems from "./Problems";
import Split from "react-split";
import { useNavigate } from "react-router-dom";
import { httpCall } from "../../util";
import { httpCallSubmit } from "../../util";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const CodeSection = (Props) => {
  // const [status, setStatus] = useState(false);
  const [clickRun, setClickRun] = useState(false);
  // const [type, setType] = useState("");
  // const [title, setTitle] = useState("");
  // const [quote, setQuote] = useState("");

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

  function runCode(language) {
    var code = UserCode.split("\n");
    var url = "";
    for (var i = 0; i < code.length; i++) {
      code[i] = code[i].trim();
      code[i] = code[i].replace("//start here", "");
    }
    code = code.join("");

    if (language === "JavaScript") {
      url = "http://192.168.1.111:3005/api/submitusercode";
    }
    if (language === "Java") {
      url =
        "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/evaluate/run";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    makeHttpCall(url, "run");
    setClickRun(true);
    return code;
  }

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [custominp, setcustominp] = useState("");

  const custominput = (text) => {
    setcustominp(text);
  };

  const handleSubmit = (language, id) => {
    var submiturl = "";
    if (language === "JavaScript") {
      submiturl = "http://192.168.1.111:3005/api/submitusercode";
    }
    if (language === "Java") {
      submiturl =
        "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/evaluate/submit";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    // makeHttpCallSubmit(submiturl, "submit");
    // autoSubmit();
  };

  let makeHttpCall = (url) => {
    const payload = {
      method: "post",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain",
      },
    };
    UserCode = UserCode.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
    UserCode = UserCode.replaceAll('""', `\\'\\'`);
    UserCode = UserCode.replaceAll("\t", ``);
    payload.body = {
      body: {
        code: UserCode,
        language: language,
        questionid: QuestionId,
        custominput: custominp,
      },
    };

    console.log(payload.body);

    //console.log("AFTER REMOVING SPECIALCHARS"+payload.body);
    httpCall(url, payload)
      .then((result) => {
        console.log("result is   js  ", result);
        // console.log("RESULT OF TESTCODE" + JSON.stringify(result));
        console.log(result);
        SetCodeOutput(result.body);
      })
      .catch((result) => {
        console.log("result is  js   ", result);
        // SetCodeOutput(result.body);
      });
  };

  // let makeHttpCallSubmit = (submiturl, type) => {
  //   const payload = {
  //     method: "put",
  //     mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   payload.body = {
  //     body: {
  //       code: UserCode,
  //       language: language,
  //       questionid: QuestionId,
  //       custominput: custominp
  //     },
  //   };

  //   httpCallSubmit(submiturl, payload)
  //     .then((result) => {
  //       // console.log("result is   js  ", result);
  //       console.log(result);

  //       SetCodeOutput(result.body);
  //     })
  //     .catch((result) => {
  //       // console.log("result is  js   ", result);
  //       SetCodeOutput(result.body);
  //     });
  // };

  // const autoSubmit = () => {
  //   if (index < Props.question.length - 1) {
  //     setIndex(index + 1);
  //   } else {
  //     navigate("/home");
  //   }
  // };

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
    window.addEventListener("blur", onBlur);

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
              runCode={runCode}
              custominput={custominput}
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
              runCode={runCode}
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
