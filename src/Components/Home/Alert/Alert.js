import React from "react";
import "./Alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

export default function Alert(data) {
  return (
    <div className="lpAlert">
      <span className="lpLine"></span>
      <span className="lpAlertMsg">
        <FontAwesomeIcon className="dangerIcon" icon={faTriangleExclamation} />
        You have {data.data.length} Assignments over due.
      </span>
    </div>
  );
}
