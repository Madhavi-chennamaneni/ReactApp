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
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <div className="title">{props.title}</div>
        <span className="date">{props.date}</span>
        <div className="icon">{isExpanded ? "-" : "+"}</div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default function LearningPath() {
  const [module, setModule] = useState([]);

  useEffect(() => {
    fetch(
      "https://62eb5d58ad295463259c700e.mockapi.io/api/dashboard/assignment/moduleQuestionTitle"
    )
      .then((res) => res.json())
      .then((json) => {
        setModule(json);
      });
  }, []);

  const currentDate = new Date();

  return (
    <div className="card-3">
      <span className="msg-2"> Learning Program Name </span>
      {module.map((data) => (
        <div className="preferences">
          <Section
            title={data.id + "." + " " + data.module}
            date={
              new Date(data.duedate).getDate() - currentDate.getDate() >= 1
                ? "Due Date : " + data.duedate
                : "Due Date : " + "Late"
            }
          >
            <Table /> <br />
          </Section>
        </div>
      ))}
    </div>
  );
}
