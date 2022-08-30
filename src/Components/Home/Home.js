import React, { useEffect, useState } from "react";
import Alert from "./Alert/Alert";
import LearningPath from "./LearningPath/LearningPath";
import WorkPath from "./WorkPath/WorkPath";
import axios from "axios";

export default function Home(Props) {
  function attendQuestion(row, time) {
    Props.attendQuestion(row, time);
  }

  const [module, setModule] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/questions/get/all",
        JSON.stringify({ learnerid: "1" }),
        {
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => setModule(JSON.parse(res.data.body)));
  }, []);

  console.log(module);

  return (
    <div className="homePage">
      <Alert data={module.data} />
      <div className="lpPathSection">
        <LearningPath data={module} attendQuestion={attendQuestion} />
        <WorkPath data={module.data} />
      </div>
    </div>
  );
}
