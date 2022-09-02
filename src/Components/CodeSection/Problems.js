import React from "react";

const Problems = ({ data }) => {
  return (
    <div className="problem" style={{element:'unset'}}>
        <h2>Exercise {data[0].questionid}</h2>
        <p className="question">{data[0].longdesc}</p>
        <h2>Example I/O</h2>
        <p className="question">
          {"Input : " + data[0].exampleinput}
        </p>
        <p className="question">
          {"Output : " + data[0].exampleoutput}
        </p>
    </div>
  );
};

export default Problems;
