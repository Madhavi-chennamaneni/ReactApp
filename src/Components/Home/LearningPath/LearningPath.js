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
  // console.log(Props.data);
  const [module, setModule] = useState([]);

  function attendQuestion1(row) {
    console.log(row)
    for (let rowData in row) {
      console.log(row[rowData])
      if(typeof(row[rowData]==Array)){
        for(let data in row[rowData]){
          console.log(row[rowData][data].timelimit)
          attendQuestion(row,row[rowData][data].timelimit);
        }
      }
      
    }
  }


  useEffect(() => {
    fetch(
      "https://62eb5d58ad295463259c700e.mockapi.io/api/dashboard/assignment/moduleQuestionTitle"
    )
      .then((res) => res.json())
      .then((json) => {
        setModule(data);
      });
  }, []);

  const currentDate = new Date();

  return (
    <div className="learningPath">
      {module.map((data) => (
        <>
          <p className="lpTitle">{data.learning_path}</p>
          <div className="lpModuleBody" key={data}>
            {data.data.map((module) => (
              <Section
                title={module.id_module + "." + " " + module.module}
                date={
                  new Date(module.due_date).getDate() - currentDate.getDate() >=
                    1
                    ? "Due Date : " + module.due_date
                    : "Due Date : " + "Late"
                }
              >
                <Table
                  complexity={module.complexity}
                  attendQuestion={attendQuestion1}
                />{" "}
                <br />
                {/* <Table questions = {module.complexity.map(complexity=>complexity.questions)}/> <br /> */}
                {/* <Table module={module.complexity}/> <br /> */}
                {/* <Table module={data}/> <br /> */}
              </Section>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
