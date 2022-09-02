import React from "react";
import moment from "moment";

const WeekDue = ({ data, nextWeekNumber, FontAwesomeIcon, faFileLines }) => {
  var currentWeeknumber = moment(new Date(), "YYYY-MM-DD").week();
  console.log(nextWeekNumber)

  return (
    <div>
      {data.map((data) =>
        moment(new Date(data.duedate), "YYYY-MM-DD").week() === nextWeekNumber ? (
          <>
            <div className="overDueList">
              <FontAwesomeIcon className="fileIcon" icon={faFileLines} />
              <h4 className="exerciseName">{data.module}</h4>
            </div>
            <div className="dueDate">
              <span className="">Due {data.duedate}</span>
              <li key={data.id} className="remainingDay">
                {/* {new Date(data.due_date).getDate() - currentDate.getDate() > 1
                  ? `${
                      new Date(data.duedate).getDate() - currentDate.getDate()
                    } days to go`
                  : `Late`} */}
                <span>{getDiff(data.duedate)}</span>
              </li>
            </div>
          </>
        ) : null
      )}
      <br />
    </div>
  );
  function getDiff(date) {
    var currentDate = moment(new Date());
    var dueDate = moment(new Date(date));
    var diff = dueDate.diff(currentDate, 'days');
    if (diff < 0) {
      return "late";
    }
    else {
      return diff + ' to go';
    }
  }
};

export default WeekDue;
