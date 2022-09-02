import React from "react";
import Alert from "./Alert/Alert";
import LearningPath from "./LearningPath/LearningPath";
import WorkPath from "./WorkPath/WorkPath";
import Header from "../Header/Header";
  
const sample = require("../../model/sample.json");
export default function Home(Props) {
  const data = [sample].map((data) => data);

  function attendQuestion(row,time) {
    Props.attendQuestion(row,time);
  }
  // console.log(data);
  return (
    <div className="homePage">
       {/* <Header/> */} 
      <Alert data={data} />
      <div className="lpPathSection">
        <LearningPath data={data} attendQuestion={attendQuestion} />
        <WorkPath data={data} />
      </div>
    </div>
  );
}
