import React, { useState, useEffect } from "react";
import "./WorkPath.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import moment from "moment";
import OverDue from "./OverDue";
import WeekDue from "./WeekDue";

const currentDate = new Date();
let currentWeeknumber = moment(currentDate, "YYYY-MM-DD").week();
console.log(currentWeeknumber) 

let first = currentDate.getDate() - currentDate.getDay() + 7; // First day is the day of the month - the day of the week
let last = first + 6; // last day is the first day + 6

let firstday = new Date(currentDate.setDate(first)).toDateString();
console.log(firstday)
let lastday = new Date(currentDate.setDate(last)).toDateString();
let nextWeekNumber = moment(new Date(firstday), "YYYY-MM-DD").week();
console.log(nextWeekNumber)

export default function WorkPath(data) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="workPath">
      <button className="workToDoBtn">
        Work To Do &nbsp;
        <FontAwesomeIcon
          className="arrowIcon"
          icon={isOpen === true ? faChevronDown : faChevronUp}
          onClick={() => setIsOpen(!isOpen)}
        />
      </button>
      {isOpen === true ? (
        <>
          <div className="overDueSection">
            <div className="DueList">
              <OverDue
                data={data.data}
                currentWeeknumber={currentWeeknumber}
                FontAwesomeIcon={FontAwesomeIcon}
                faFileLines={faFileLines}
              />
              <div className="">
                <h3 className="nextWeekDate">
                  {firstday} - {lastday}
                </h3>
                <hr className="hrLine" />
                <WeekDue
                  data={data.data}
                  nextWeekNumber={nextWeekNumber}
                  FontAwesomeIcon={FontAwesomeIcon}
                  faFileLines={faFileLines}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
