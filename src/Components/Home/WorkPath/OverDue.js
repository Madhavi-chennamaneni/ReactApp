import React from "react";

const OverDue = ({ datas, currentWeek, FontAwesomeIcon, faFileLines }) => {
  // console.log(datas.data.map(module=>module.data.map(data=>data.module)));
  // const data=datas.data.map(data=>data.data);
  // data = data.data.map(data => data.module)
  // console.log(data[0]);
  // console.log(data[0].data[0].due_date)
  const currentDate = new Date();

  const filteredData = datas.data.map((module) =>
    module.data.filter(
      (data) =>
        Math.ceil(
          (new Date(data.due_date).getDate() +
            6 -
            new Date(data.due_date).getDay()) /
            7
        ) === currentWeek ||
        Math.ceil(
          (new Date(data.due_date).getDate() +
            6 -
            new Date(data.due_date).getDay()) /
            7
        ) ===
          currentWeek - 1
    )
  );
  // filteredData = filteredData.map(data=>data.map((data)));
  // console.log(filteredData.map(module=>module.length));
  // console.log(filteredData.map(data=>data.map(data=>data.module)));
  return (
    <div>
      <div className="overdueSection">
        <h3 className="overdueHead">Overdue</h3>
        <span className="badge">
          {filteredData.map((module) => module.length)}{" "}
        </span>
      </div>
      <hr />
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
                {/*  {<Moment from={new Date()} ago>{new Date(data.dueDate)}</Moment>} to go */}
                {new Date(data.due_date).getDate() - currentDate.getDate() >= 1
                  ? `${
                      new Date(data.due_date).getDate() - currentDate.getDate()
                    } days to go`
                  : `Late`}
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
