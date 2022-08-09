import React from "react";

const WeekDue = ({ data }) => {
  const currentDate = new Date();
  return (
    <div>
      <h4 className="exerciseName">{data.name}</h4>
      <div className="dueDate">
        <span className="due">Due {data.dueDate}</span>
        <li key={data.id} className="remainingDay">
          {new Date(data.dueDate).getDate() - currentDate.getDate() > 1
            ? `${
                new Date(data.dueDate).getDate() - currentDate.getDate()
              } days to go`
            : `Late`}
        </li>
      </div>
      <br />
    </div>
  );
};

export default WeekDue;
