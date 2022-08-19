import React, { useState, useEffect } from "react";
import "./editorPage.css";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import Problems from "./Problems";
import Split from "react-split";
import { useNavigate } from "react-router-dom";
import { httpCall } from "../../util";
import { require } from "ace-builds";
const sample = require("../../model/sample.json");
const data = sample.data.map((data) =>
  data.complexity.map((complexity) =>
    complexity.questions.map((questions) => questions)
  )
);
// console.log(data);
// console.log(data.map(data=>data.data.map(data=>data.complexity.map(complexity=>complexity.questions.map(questions=>questions.id)))));

const CodeSection = (Props) => {

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
      url = "http://192.168.1.112:3005/api/runjavascript";
    }
    if (language === "Java") {
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    makeHttpCall(url);
    return code;
  }

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(
      "https://62eb5d58ad295463259c700e.mockapi.io/api/dashboard/assignment/Question"
    )
      .then((res) => res.json())
      .then((json) => {
        setProblems(json);
      });
  }, []);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (language, id) => {
    var url = "";
    if (language === "JavaScript") {
      url = "http://192.168.1.112:3005/api/verifyusercode";
    }
    if (language === "Java") {
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    // if (language === "c/c++") {
    //   url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    // }

    makeHttpCall(url);
    autoSubmit();
  };

  let makeHttpCall = (url) => {
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
      alert("You have attended the maximum chances !");
      navigate("/home");
    }
  };

  const onFocus = () => {
    // window.confirm("If you navigate from this screen your will automatically submitted. Because, you are in onfocus!");
  };

  useEffect(() => {
    const onBlur = () => {
      // alert(
      //   "You have navigated from this screen. Therefore, your answer has been submitted. Here is the new Question ? "
      // );
      // autoSubmit();
    };
    // window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    onFocus();

    return () => {
      // window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  return (
    <div>
      {/* {problems.map((data) => */}
      {/* index === problems.indexOf(data) && index <= problems.length - 1 ? ( */}
      <>
        <Split direction="horizontal" className="main-container">
          {/* <Problems data={data} /> */}
          <Problems data={Props.question} />
          <CodeEditor
            UserCode={UserCode}
            SetUserCode={SetUserCode}
            codeChange={codeChange}
            getOutput={getOutput}
            handleSubmit={handleSubmit}
            data={Props.question}
          />
          <OutputWindow
            CodeOutput={CodeOutput}
            problems={problems}
            handleSubmit={handleSubmit}
            data={Props.question}
          />
        </Split>
      </>
      {/* ) : null */}
      {/* // )} */}
    </div>
  );
};

export default CodeSection;
