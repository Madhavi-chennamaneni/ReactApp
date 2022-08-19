import React from "react";
import "./Alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

export default function Alert(data) {
  data = data.data.map((module) => module.data);
  return data.map((data) =>
    data.length === data.length ? (
      <div className="lpAlert">
        <span className="lpLine"></span>
        <span className="lpAlertMsg">
          <FontAwesomeIcon
            className="dangerIcon"
            icon={faTriangleExclamation}
          />{" "}
          You have {data.length} Assignments over due.
        </span>
      </div>
    ) : null
  );
}
