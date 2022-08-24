import React, { useState, useEffect } from "react";
import "./editorPage.css";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import Problems from "./Problems";
import Split from "react-split";
import { useNavigate } from "react-router-dom";
import { httpCall } from "../../util";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

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
  const [alertBodyText, setAlertBodyText] = useState('');
  // const [type, setType] = useState("");
  // const [title, setTitle] = useState("");
  // const [quote, setQuote] = useState("");
  /* Problems */

  useEffect(() => {
    fetch("https://62eb6772705264f263d7de1e.mockapi.io/problems")
      .then((res) => res.json())
      .then((json) => {
        setProblems(json);
      });
  }, []);

  /* Output */
  var [UserCode, SetUserCode] = useState(``);
  var [language, SetLanguage] = useState(``);
  var [QuestionId, SetQuestionId] = useState(``);
  var [CodeOutput, SetCodeOutput] = useState(``);

  function codeChange(NewValue, language, id) {
    SetUserCode(NewValue);
    SetQuestionId(id);
    SetLanguage(language);
  }

  function getOutput(language) {
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
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    makeHttpCall(url);
    setClickRun(true)
    return code;
  }

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(
      "https://62eb6772705264f263d7de1e.mockapi.io/problems"
    )
      .then((res) => res.json())
      .then((json) => {
        setProblems(json);
      });
  }, []);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [custominp, setcustominp] = useState("");

  const custominput = (text) => {
    setcustominp(text);
  };

  const handleSubmit = (language, id) => {
    var url = "";
    if (language === "JavaScript") {
      url = "http://192.168.1.111:3005/api/submitusercode";
    }
    if (language === "Java") {
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    makeHttpCall(url, "submit");
    autoSubmit();
  };

  let makeHttpCall = (url, type) => {
    const payload = {
      method: "post",
      headers: {
        "Content-Type": "text/plain",
      },
    };
    payload.body = JSON.stringify({
      code: UserCode,
      language: language,
      questionid: QuestionId,
      custominput: custominp,
      hittype: type,
    });
    httpCall(url, payload)
      .then((result) => {
        // console.log("result is   js  ", result);
        // console.log(result);
        SetCodeOutput(result.body);
      })
      .catch((result) => {
        // console.log("result is  js   ", result);
        SetCodeOutput(result.body);
      });
  };

  const autoSubmit = () => {
    if (index < problems.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/home");
    }
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    const alertLandOnCodeSection = () => {
      alert('If You navigate from this page, the question will submit automatically and we give another question for you')
    }
    window.addEventListener('load', alertLandOnCodeSection);
    return () => {
      window.removeEventListener('focus', alertLandOnCodeSection)
    }
  })

  useEffect(() => {
    const onBlur = () => {
      setShow(true)
      setAlertBodyText('You have navigated from this page.So, we give a another qns for you')
      // setStatus(true);
      // setType("warning");
      // setTitle("Warning");
      // setQuote("You have navigated from this page.So, we give a another qns for you");
      autoSubmit();
    };
    // window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      // window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });
  useEffect(() => {
    const timer = setInterval(() => {
      if (Props.seconds > 0) {
        Props.setSeconds(Props.seconds - 1);
      } else {
        clearInterval(timer)
        setShow(true);
        setAlertBodyText('You have reached your timelimit')
        autoSubmit();
        /*  setStatus(true);
         setType("warning");
         setTitle("Alert");
         setQuote("You have reached your time limit") */
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [Props.seconds]);



  return (
    <div>
      <Modal show={show} onHide={handleClose} size="mg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="warning">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="warning">{alertBodyText}</Modal.Body>
      </Modal>
      {(clickRun === true) ? (
        <>
          <Split direction="horizontal" className="main-container" >
            <Problems data={Props.question} />
            <CodeEditor
              UserCode={UserCode}
              SetUserCode={SetUserCode}
              codeChange={codeChange}
              getOutput={getOutput}
              handleSubmit={handleSubmit}
              data={Props.question}
              setClickRun={setClickRun}
            />
            <OutputWindow
              CodeOutput={CodeOutput}
              problems={problems}
              handleSubmit={handleSubmit}
              data={Props.question}
            // setStatus={setStatus}
            // setType={setType}
            // setTitle={setTitle}
            // setQuote={setQuote}
            />
          </Split>
        </>
      ) : (<> <Split direction="horizontal" className="main-container">
        <Problems data={Props.question} />
        <CodeEditor
          UserCode={UserCode}
          SetUserCode={SetUserCode}
          codeChange={codeChange}
          custominput={custominput}
          getOutput={getOutput}
          handleSubmit={handleSubmit}
          data={Props.question}
        />
      </Split>
      </>)}
    </div>
  )
};

export default CodeSection;
