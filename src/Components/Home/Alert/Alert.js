import React from "react";
import "./Alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

export default function Alert(data) {
  const currentDate = new Date();

  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const currentWeek = Math.ceil(days / 7);
  let first = currentDate.getDate() - currentDate.getDay() + 7; // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6

  const filteredData = data.data.filter(
    (module) =>
      Math.ceil(
        Math.floor(
          (new Date(module.duedate) -
            new Date(currentDate.getFullYear(), 0, 1)) /
            (24 * 60 * 60 * 1000)
        ) / 7
      ) === currentWeek ||
      Math.ceil(
        Math.floor(
          (new Date(module.duedate) -
            new Date(currentDate.getFullYear(), 0, 1)) /
            (24 * 60 * 60 * 1000)
        ) / 7
      ) ===
        currentWeek - 1
  );

  return filteredData.length === 0 ? null : (
    <div className="lpAlert">
      <span className="lpLine"></span>
      <span className="lpAlertMsg">
        <FontAwesomeIcon className="dangerIcon" icon={faTriangleExclamation} />
        You have {filteredData.length} Assignments over due.
      </span>
    </div>
  );
}
