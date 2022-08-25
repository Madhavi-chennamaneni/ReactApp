import React, { useState, useEffect } from "react";
import "./Table.css";
import DataTable from "react-data-table-component";

export default function Table(Props) {
  const complexity = Props.complexity.filter(
    (questions) => questions.questions.length >= 1
  );
  const [state, setState] = useState(false);

  let attendQuestion = (row) => {
    Props.attendQuestion(row);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.questions.map((questions) => questions.id),
      width: "52px",
      height: "45px",
    },
    {
      name: "NAME",
      selector: (row) => row.questions.map((questions) => questions.shortdesc),
      width: "300px",
    },
    {
      name: "TYPE",
      selector: (row) => {
        const type = row.questions.map((questions) => questions.categoryid);
        switch (type[0]) {
          case 1:
            return "Coding";
            break;
          default:
            return null;
        }
      },
      width: "85px",
    },
    {
      name: "DIFFICULTY",
      selector: (row) => {
        const difficulty = row.questions.map(
          (questions) => questions.complexityid
        );
        switch (difficulty[0]) {
          case 1:
            return "Easy";
            break;
          case 2:
            return "Medium";
            break;
          case 3:
            return "Hard";
            break;
          default:
            return null;
        }
      },
      width: "125px",
    },
    {
      name: "DURATION",
      selector: (row) =>
        row.questions.map((questions) => questions.timelimit + " " + "mins"),
      width: "120px",
    },
    {
      name: "STATUS",
      cell: (row) => (
        <button className="btn-due" onClick={() => attendQuestion(row)}>
          Due
        </button>
      ),
      width: "111px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        alignItems: "center",
        background: "#F8F9FA",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "15px",
        letterSpacing: "0.05em",
        color: "#5F6368",
        width: "250px",
      },
    },
    cells: {
      style: {
        alignItems: "center",
        background: "white",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "17px",
        lineHeight: "20px",
        color: "#202020",
      },
    },
  };

  // const [assignment, setAssignment] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://62eb5d58ad295463259c700e.mockapi.io/api/dashboard/assignment/assignment"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setAssignment(json);
  //     });
  // }, []);

  return (
    <div className="dataTable">
      <DataTable
        onChange={(e) => setState({ value: e.target.value })}
        value={state.value}
        columns={columns}
        data={complexity}
        customStyles={customStyles}
      />
    </div>
  );
}
