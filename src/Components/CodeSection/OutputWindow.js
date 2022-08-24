import React, { useState, useEffect } from "react";

const OutputWindow = (Props) => {
  const time = Props.data.questions[0].timelimit;
  const [seconds, setSeconds] = useState(time * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        clearInterval(timer);
        alert("you have reached your time limit");
        Props.handleSubmit();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="outputWindow">
      <div className="timer">
        <span className="outputHead">Output</span>
        <span className="outputHead">
          Time left :{" "}
          {`${Math.floor(seconds / 3600)}h:${Math.floor(
            (seconds % 3600) / 60
          )}m:${Math.floor((seconds % 3600) % 60)}s`}
        </span>
      </div>
      <div className="output">{Props.CodeOutput}</div>
    </div>
  );
};

export default OutputWindow;
