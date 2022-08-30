import React from "react";
import Moment from "react-moment";

const OverDue = ({ data, currentWeek, FontAwesomeIcon, faFileLines }) => {
  const currentDate = new Date();

  const filteredData = data.filter(
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
  console.log(filteredData);

  return (
    <div>
      <div className="overdueSection">
        <h3 className="overdueHead">Overdue</h3>
        <span className="overDuebadge">{filteredData.length}</span>
      </div>
      <hr className="hrLine" />
      {filteredData.map((data) =>
        data.map((data) => (
          <>
            <div className="overDueList">
              <FontAwesomeIcon className="fileIcon" icon={faFileLines} />
              <h4 className="exerciseName">{data.module}</h4>
            </div>
            <div className="dueDate">
              <span className="">Due {data.due_date}</span>
              <li className="remainingDay">
                {/* {<Moment diff={new Date()} unit="days">{new Date(data.due_date)}</Moment>} to go */}
                {new Date(data.dueDate).getDate() >= currentDate.getDate() ? (
                  <Moment from={new Date()} ago>
                    {new Date(data.dueDate)}
                  </Moment>
                ) : (
                  "Late"
                )}
              </li>
            </div>
          </>
        ))
      )}
      <br />
    </div>
  );
};

export default OverDue;
