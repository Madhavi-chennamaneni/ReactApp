import React, { useState, useEffect } from "react";

const OutputWindow = (Props) => {
  return (
    <div className="outputWindow">
      <div className="outputHead">
        <span className="outputHeadText">Output</span>
      </div>
      <div className="output">{Props.CodeOutput}</div>
    </div>
  );
};

export default OutputWindow;
