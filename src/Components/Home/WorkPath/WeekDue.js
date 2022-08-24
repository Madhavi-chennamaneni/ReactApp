import React from "react";
// filteredData.map(data=>data.map((data)
const WeekDue = ({ datas, nextWeek, FontAwesomeIcon, faFileLines }) => {
  const data = datas.data.map((module) => module.data);
  // console.log(data.map(data=>data.map(data=>data.due_date)));
  // console.log(datas.data.map(module=>module.data.map(data=>data)));
  const currentDate = new Date();
  return (
    <div>
      {data.map((data) =>
        data.map((data) =>
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
                <span className="">Due {data.due_date}</span>
                <li key={data.id} className="remainingDay">
                  {new Date(data.due_date).getDate() - currentDate.getDate() > 1
                    ? `${
                        new Date(data.due_date).getDate() -
                        currentDate.getDate()
                      } days to go`
                    : `Late`}
                </li>
              </div>
            </>
          ) : null
        )
      )}
      <br />
    </div>
  );
};

export default WeekDue;
