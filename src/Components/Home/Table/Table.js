import React, { useState, useEffect } from "react";
import "./Table.css";
import DataTable from "react-data-table-component";
import sample from '../../../model/sample.json'

export default function Table(Props) {
  const complexity = Props.complexity.filter(
    (questions) => questions.questions.length >= 1
  );
  // const complexity = sample.data.map(complexity=>complexity.complexity);
  // console.log(complexity.map(complexity=>complexity.map(questions=>questions)));
  // console.log(complexity);

  const [state, setState] = useState(false);
  const [disabled, setDisabled] = useState(true);

  let attendQuestion = (row) => {
    Props.attendQuestion(row);
  };

  // const handleChange = (priority) => {
  //   if (priority == 1) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // };

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
        switch (row.id_complexity) {
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
    // {
    //   name: "DIFFICULTY",
    //   selector: (row) => {
    //     const difficulty = row.questions.map(
    //       (questions) => questions.complexityid
    //     );
    //     switch (difficulty[0]) {
    //       case 1:
    //         return "Easy";
    //         break;
    //       case 2:
    //         return "Medium";
    //         break;
    //       case 3:
    //         return "Hard";
    //         break;
    //       default:
    //         return null;
    //     }
    //   },
    //   width: "125px",
    // },
    {
      name: "DURATION",
      selector: (row) =>
        row.questions.map((questions) => questions.timelimit + " " + "mins"),
      width: "120px",
    },
    {
      name: "STATUS",
      cell: (row) => (
        <button
          className="btn-due"
          onClick={() => {
            attendQuestion(row);
          }}
          disabled={!disabled}
          // onChange={() => handleChange(priority)}
        >
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

  return (
    <div className="dataTable">
      <DataTable
        onChange={(e) => setState({ value: e.target.value })}
        value={state.value}
        columns={columns}
        // data={complexity.map(complexity=>complexity.map(questions=>questions))}
        data={complexity}
        customStyles={customStyles}
      />
    </div>
  );
}
