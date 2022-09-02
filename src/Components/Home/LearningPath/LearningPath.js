import React, { useState, useEffect } from "react";
import "./LearningPath.css";
import Table from "../Table/Table";
import useCollapse from "react-collapsed";

function Section(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div>
      <div className="lpModule" {...getToggleProps()}>
        <div className="lpModuleTitle">{props.title}</div>
        <div className="lpModuleDate">
          {props.date}
          <span className="lpModuleDropdownIcon">{isExpanded ? "-" : "+"}</span>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default function LearningPath({ data, attendQuestion }) {
  function attendQuestion1(row) {
    // console.log(row)
    for (let rowData in row) {
      // console.log(row[rowData]);
      if (typeof (row[rowData] == Array)) {
        for (let data in row[rowData]) {
          // console.log(row[rowData][data].timelimit)
          attendQuestion(row, row[rowData][data].timelimit);
        }
      }
    }
  }

  // const priority = data.data.map((priority) => priority.priority);
  // console.log(priority);

  const currentDate = new Date();
  // console.log(currentDate);
  const currentMonth = new Date().getMonth() + 1;
  // console.log(currentMonth);
  const currentYear = new Date().getFullYear();
  // console.log(currentYear);

  // const [disabled, setDisabled] = useState (true);

  // const handleClick = (priority) => {
  //   if(priority[0] == 1)
  //   {
  //     setDisabled(false);
  //   }
  //   else
  //   {
  //     setDisabled(true);
  //   }
  // }
  
  return (
    <div className="learningPath">
      <>
        <p className="lpTitle">{data.learning_path}</p>
        <div className="lpModuleBody" key={data} /* onClick={!disabled} */>
          {data.data.map((module) => (
            <Section
              title={module.id_module + "." + " " + module.module}
              date={
                new Date(module.duedate).getDate() - currentDate.getDate() >=
                  1 &&
                new Date(module.duedate).getMonth() + 1 - currentMonth >= 0 &&
                new Date(module.duedate).getFullYear() - currentYear >= 0
                  ? "Due Date : " + module.duedate
                  : "Due Date : " + "Late"
              }
            >
              <Table
                complexity={module.complexity}
                attendQuestion={attendQuestion1}
              />
              <br />
            </Section>
          ))}
        </div>
      </>
    </div>
  );
}
