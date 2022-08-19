import React, { useState, useEffect } from "react";
import "./Table.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function Table(Props) {
  const [tabledata, settabledata] = useState([]);

  let attendQuestion = (row) => {
    Props.attendQuestion(row);
  };
  // console.log(questions.questions.map(questions=>questions.map(questions=>questions)));
  // var arr = [];
  // console.log("LIST OF COMPLEXITIES::" + JSON.stringify(module.moduleQns.map(questions=>questions)));

  // questions = questions.questions.map(questions=>questions.map(questions=>{arr.push(questions)}));

  // const data = module.module.data.map(data=>data.complexity.map(complexity=>complexity));
  // data.map(data=>data.map(data=>{arr.push(data)}));

  useEffect(() => {
    const complexity = Props.complexity;
    var arr = [];
    for (var i = 0; i < complexity.length; i++) {
      arr.push(complexity[i].questions[0]);
    }
    settabledata(arr);
  });

  // const propdata=Props.complexity;
  // propdata.map(quest=>{ settabledata(quest.questions[0],...tabledata)});

  //  var arr= propdata.map(quest=>{ arr1.push(quest.questions[0]); console.log(quest.questions[0]); return quest.questions[0]})

  //  const data = module.map(data=>data.map(data=>{arr.push(data)}));
  //  console.log(data);
  // console.log(module.module.data.map(data=>data.complexity.map(complexity=>complexity.questions.map(questions=>questions.shortdesc))));
  // console.log(module.module.complexity.map(complexity=>complexity.questions.map(questions=>questions.shortdesc)));
  // let data = module.module.complexity.map(complexity=>complexity.questions);
  // let questions = data.questions.map(data=>data.id)
  // console.log(filteredData.map(data=>data.map(data=>data.module)));
  // console.log(arr);
  // console.log(data.map(data=>data.map(data=>data.questions.map(questions=>questions.shortdesc))));
  // console.log(data.map(data=>data.map(data=>{arr.push(data)})));
  // console.log(questions);
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
      selector: (row) =>
        row.questions.map((questions) => questions.categoryid === 1)
          ? "Coding"
          : null,
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
        }
      },
      width: "125px",
    },
    {
      name: "DURATION",
      selector: (row) =>
        row.questions.map((questions) => questions.timelimit) + " " + "mins",
      width: "120px",
    },
    {
      name: "STATUS",
      cell: (row) => (
        <button className="btn-due" onClick={() => attendQuestion(row)}>
          Due
        </button>
      ),
      width: "108px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        alignItems: "center",
        background: "#F8F9FA",
        fontFamily: "Inter",
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
        fontFamily: "Inter",
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
        columns={columns}
        data={Props.complexity}
        // data={module.moduleQns}
        customStyles={customStyles}
      />
    </div>
  );
}
