import React, { useEffect, useState } from "react";
import Alert from "./Alert/Alert";
import LearningPath from "./LearningPath/LearningPath";
import WorkPath from "./WorkPath/WorkPath";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import sample from "../../model/sample.json";
// console.log(sample);
export default function Home(Props) {
  function attendQuestion(row, time) {
    Props.attendQuestion(row, time);
  }

  const [module, setModule] = useState({});
  const [error, setError] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
      .then((res) => {
        setIsLoaded(true);
        // setModule(JSON.parse(res.data.body));
        setModule(sample);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
        setShow(true);
      });
  }, []);

  // console.log(module);

    if (Object.keys(error).length > 0) {
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error !</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error.message}</Modal.Body>
        </Modal>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ position: "absolute", top: "40%", left: "45%" }}>
          <Spinner animation="border" role="status" variant="secondary"></Spinner>
          <br /> &nbsp; &nbsp;
          <span className="visible">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="homePage">
          {module.data && (
            <>
              <Alert data={module.data} />
              <div className="lpPathSection">
                <LearningPath data={module} attendQuestion={attendQuestion} />
                <WorkPath data={module.data} />
              </div>
            </>
          )}
        </div>
      );
    }
  }

  // return (
  //   <div className="homePage">
  //     <Alert data={sample.data} />
  //     <div className="lpPathSection">
  //       <LearningPath data={sample} attendQuestion={attendQuestion} />
  //       <WorkPath data={sample.data} />
  //     </div>
  //   </div>
  // );
// }

// fetch(
//   "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/questions/get/all",
//   {
//     mode: "no-cors",
//     method: "post",
//     headers: { "Content-Type": "application/json" },
//     body: {learnerid: "1"}
//   }
// )
//   .then((res) => res.json())
//   .then((json) => {
//     setModule(json);
//   });
