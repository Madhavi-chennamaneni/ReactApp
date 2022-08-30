import React, { useState, useEffect } from "react";
import "./WorkPath.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import OverDue from "./OverDue";
import WeekDue from "./WeekDue";

const currentDate = new Date();

const startDate = new Date(currentDate.getFullYear(), 0, 1);
const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

const currentWeek = Math.ceil(days / 7);
let first = currentDate.getDate() - currentDate.getDay() + 7; // First day is the day of the month - the day of the week
let last = first + 6; // last day is the first day + 6

let firstday = new Date(currentDate.setDate(first)).toDateString();
let lastday = new Date(currentDate.setDate(last)).toDateString();
let nextWeek = Math.ceil((first + 6 - new Date(first).getDay()) / 7);

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
                currentWeek={currentWeek}
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
                  nextWeek={nextWeek}
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
