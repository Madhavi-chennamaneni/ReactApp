import React, { useState, useEffect } from "react";
import "./editorPage.css";
import CodeEditor from "./CodeEditor";
import OutputWindow from "./OutputWindow";
import Problems from "./Problems";
import Split from "react-split";
import { Link, useNavigate } from "react-router-dom";
import { httpCall } from "../../util";

const CodeSection = () => {
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
  var [CodeOutput, SetCodeOutput] = useState(``);

  function codeChange(NewValue) {
    SetUserCode(NewValue);
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
      url = "http://192.168.1.111:3005/api/runjavascript";
    }
    if (language === "java") {
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    if (language === "c/c++") {
      url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    }

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

  const handleSubmit = (language) => {
    ////////////////////
    var url = "";
    if (language === "JavaScript") {
      url = "http://192.168.1.111:3005/api/savequestion";
    }
    if (language === "Java") {
      url = "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta";
    }

    if (language === "c/c++") {
      url = "$$$$$$$$$$$$$$$$$$$$$$$$$$$$";
    }

    makeHttpCall(url);

    //////////////////////////////

    // if (index < question.length - 1) {
    //   setIndex(index + 1);
    // } else {
    //   alert("You have attended the maximum chances !");
    //   navigate("/home");
    // }
    autoSubmit();
  };

  let makeHttpCall = (url) => {
    const payload = {
      method: "post",
      headers: {
        "Content-Type": "text/plain",
      },
    };
    payload.body = JSON.stringify({ code: UserCode });
    httpCall(url, payload)
      .then((result) => {
        console.log("result is   js  ", result);
        SetCodeOutput(result.body);
      })
      .catch((result) => {
        console.log("result is  js   ", result);
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
      alert(
        "You have navigated from this screen. Therefore, your answer has been submitted. Here is the new Question ? "
      );
      autoSubmit();
    };
    // window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    onFocus();

    return () => {
      // window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  },);

  return (
    <div>
      {problems.map((data) =>
        index === problems.indexOf(data) && index <= problems.length - 1 ? (
          <>
            <Split direction="horizontal" className="main-container">
              <Problems data={data} />
              <CodeEditor
                UserCode={UserCode}
                SetUserCode={SetUserCode}
                codeChange={codeChange}
                getOutput={getOutput}
                handleSubmit={handleSubmit}
                data={data}
              />
              <OutputWindow
                CodeOutput={CodeOutput}
                problems={problems}
                handleSubmit={handleSubmit}
                data={data}
              />
            </Split>
          </>
        ) : null
      )}
    </div>
  );
};

export default CodeSection;
