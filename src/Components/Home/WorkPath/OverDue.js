import React from "react";
import moment from "moment";

const OverDue = ({ data, currentWeeknumber, FontAwesomeIcon, faFileLines }) => {

  const filteredData = data.filter(
    (module) =>
    // console.log(module.duedate)
    moment(module.duedate, "YYYY-MM-DD").week() <= currentWeeknumber
  );

  // console.log(filteredData.map(data=>data.module));

  // Hard code with the sample json

  return (
    <div>
      <div className="overdueSection">
        <h3 className="overdueHead">Overdue</h3>
        <span className="overDuebadge">{filteredData.length}</span>
      </div>
      <hr className="hrLine" />
      {filteredData.map((data) =>
       
          <>
            <div className="overDueList">
              <FontAwesomeIcon className="fileIcon" icon={faFileLines} />
              <h4 className="exerciseName">{data.module}</h4>
            </div>
            <div className="dueDate">
              <span className="">Due {data.duedate}</span>
              <li className="remainingDay">
                {/* {<Moment diff={new Date()} unit="days">{new Date(data.due_date)}</Moment>} to go */}
                {/* {new Date(data.dueDate).getDate() >= currentDate.getDate() ? (
                  <Moment from={new Date()} ago>
                    {new Date(data.dueDate)}
                  </Moment>
                ) : (
                  "Late"
                )} */}
                 <span>{getDiff(data.duedate)}</span>
              </li>
              
            </div>
          </>
        )}
      <br />
    </div>
  );

  function getDiff(date)
  {
    var currentDate = moment(new Date());
    var dueDate = moment(new Date(date));
    var diff= dueDate.diff(currentDate, 'days');
   if( diff<0 )
   {
    return "late";
   }else if(diff==0){
    return  '1 day to go' ;
   }
   else
   {
    return diff + 'days to go' ;
   }


  }

  //  Fetching with API

  // return (
  //   <div>
  //     <div className="overdueSection">
  //       <h3 className="overdueHead">Overdue</h3>
  //       <span className="overDuebadge">{filteredData.length}</span>
  //     </div>
  //     <hr className="hrLine" />
  //     {filteredData.map((data) =>
  //       data.map((data) => (
  //         <>
  //           <div className="overDueList">
  //             <FontAwesomeIcon className="fileIcon" icon={faFileLines} />
  //             <h4 className="exerciseName">{data.module}</h4>
  //           </div>
  //           <div className="dueDate">
  //             <span className="">Due {data.due_date}</span>
  //             <li className="remainingDay">
  //               {/* {<Moment diff={new Date()} unit="days">{new Date(data.due_date)}</Moment>} to go */}
  //               {new Date(data.dueDate).getDate() >= currentDate.getDate() ? (
  //                 <Moment from={new Date()} ago>
  //                   {new Date(data.dueDate)}
  //                 </Moment>
  //               ) : (
  //                 "Late"
  //               )}
  //             </li>
  //           </div>
  //         </>
  //       ))
  //     )}
  //     <br />
  //   </div>
  // );
};

export default OverDue;
