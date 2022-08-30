import React from "react";
import Moment from "react-moment";

const WeekDue = ({ data, nextWeek, FontAwesomeIcon, faFileLines }) => {
  const currentDate = new Date();

  return (
    <div>
      {data.map((data) =>
        Math.ceil(
          (new Date(data.due_date).getDate() +
            6 -
            new Date(data.due_date).getDay()) /
            7
        ) === nextWeek ? (
          <>
            <div className="overDueList">
              <FontAwesomeIcon className="fileIcon" icon={faFileLines} />
              <h4 className="exerciseName">{data.module}</h4>
            </div>
            <div className="dueDate">
              <span className="">Due {data.duedate}</span>
              <li key={data.id} className="remainingDay">
                {new Date(data.due_date).getDate() - currentDate.getDate() > 1
                  ? `${
                      new Date(data.duedate).getDate() - currentDate.getDate()
                    } days to go`
                  : `Late`}
              </li>
            </div>
          </>
        ) : null
      )}
      <br />
    </div>
  );
};

export default WeekDue;
