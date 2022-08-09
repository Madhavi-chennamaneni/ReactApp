import React, { useState, useEffect } from "react";
import "./Table.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

export default function Table() {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "72px",
      height: "45px",
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      width: "179px",
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
      width: "120px",
    },
    {
      name: "DURATION",
      selector: (row) => row.duration,
      width: "156px",
    },
    {
      name: "STATUS",
      // selector: (row) => row.status,
      cell:(row) => <button className="btn-due">
      <Link to="/coding" style={{ color: "white", textDecoration: "none" }}>
        Due
      </Link>
    </button>,
      width: "188px",
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

  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    fetch(
      "https://62eb5d58ad295463259c700e.mockapi.io/api/dashboard/assignment/assignment"
    )
      .then((res) => res.json())
      .then((json) => {
        setAssignment(json);
      });
  }, []);

  return (
    <div className="dataTable" >
      <DataTable
        columns={columns}
        data={assignment}
        customStyles={customStyles}
      />
    </div>
  );
}





























// import React, { useState, useEffect } from "react";
// import "./Table.css";
// import DataTable from "react-data-table-component";
// import { Link } from "react-router-dom";

// export default function Table() {
//   const columns = [
//     {
//       name: "ID",
//       selector: (row) => row.id,
//       width: "92px",
//       height: "45px",
//     },
//     {
//       name: "NAME",
//       selector: (row) => row.name,
//       width: "199px",
//     },
//     {
//       name: "TYPE",
//       selector: (row) => row.type,
//       width: "110px",
//     },
//     {
//       name: "DURATION",
//       selector: (row) => row.duration,
//       width: "146px",
//     },
//     {
//       name: "STATUS",
//       selector: (row) => row.status,
//       width: "188px",
//     },
//   ];

//   const data = [
//     {
//       id: 2.1,
//       name: "Data Structure 1",
//       type: "MCQ",
//       duration: "10 mins",
//       status: <button className="btn-submit"> Submitted </button>,
//     },
//     {
//       id: 2.2,
//       name: "Data Structure 2",
//       type: "Coding",
//       duration: "10 mins",
//       status: (
//         <button className="btn-due">
//           {" "}
//           <Link to="/coding" style={{ color: "white", textDecoration: "none" }}>
//             {" "}
//             Due{" "}
//           </Link>{" "}
//         </button>
//       ),
//     },
//   ];

//   const customStyles = {
//     headCells: {
//       style: {
//         alignItems: "center",
//         background: "#F8F9FA",
//         fontFamily: "Inter",
//         fontStyle: "normal",
//         fontWeight: "700",
//         fontSize: "14px",
//         lineHeight: "15px",
//         letterSpacing: "0.05em",
//         color: "#5F6368",
//         width: "250px",
//       },
//     },
//     cells: {
//       style: {
//         alignItems: "center",
//         background: "white",
//         fontFamily: "Inter",
//         fontStyle: "normal",
//         fontWeight: "500",
//         fontSize: "17px",
//         lineHeight: "20px",
//         color: "#202020",
//       },
//     },
//   };

//   return (
//     <div className="dataTable">
//     <DataTable
//         columns={columns}
//         data={data}
//         customStyles={customStyles}
//     />
//     </div>
//   );
// }

// const [btn, setBtn] = useState(false);

//   const handleBtn = () => {
//     <button className="btn-due">
//           <Link to="/coding" style={{ color: "white", textDecoration: "none" }}>
//             Due
//           </Link>
//         </button>
//   }
