import React from "react";

const Problems = ({ data }) => {
  return (
    <div className="problem" style={{element:'unset'}}>
        <h2>Exercise {data.questions[0].id}</h2>
        <p className="question">{data.questions[0].longdesc}</p>
        <h2>Example I/O</h2>
        <p className="question">
          {"Input : " + data.questions[0].exampleinput}
        </p>
        <p className="question">
          {"Output : " + data.questions[0].exampleoutput}
        </p>
    </div>
  );
};

export default Problems;
