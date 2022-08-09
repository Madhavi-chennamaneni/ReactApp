import React, { useState, useEffect } from 'react'
import './WorkPath.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines'
import { isDOMComponent } from 'react-dom/test-utils'
import OverDue from './OverDue'
import WeekDue from './WeekDue';

const currentDate = new Date();
const currentWeek = Math.ceil((currentDate.getDate() + 6 - currentDate.getDay()) / 7);

let first = currentDate.getDate() - currentDate.getDay() + 7; // First day is the day of the month - the day of the week
let last = first + 6; // last day is the first day + 6

let firstday = new Date(currentDate.setDate(first)).toDateString();
let lastday = new Date(currentDate.setDate(last)).toDateString();
let nextWeek = Math.ceil((first + 6 - new Date(first).getDay()) / 7)

export default function WorkPath() {
    const [isOpen, setIsOpen] = useState(true);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch(
            "https://62eb6772705264f263d7de1e.mockapi.io/assignment")
            .then((res) => res.json())
            .then((json) => {
                setDatas(json)
            })

    }, [])


    return (
        <div className='card-4'>
            <div className='card-5'>  <hr />
                <button className='workToDoBtn'>
                    Work To Do&nbsp;
                    <FontAwesomeIcon className='Icon' icon={(isOpen === true) ? faChevronDown : faChevronUp} onClick={() => setIsOpen(!isOpen)} />
                </button>
                {(isOpen === true) ? (
                    <>
                        <div className='overDueSection'> 
                            <div className='DueList'>
                                 <OverDue datas={datas} currentWeek={currentWeek}  FontAwesomeIcon={FontAwesomeIcon} faFileLines={faFileLines}/>
                                <div className=''>
                                    <h3>{firstday} - {lastday}</h3><hr />
                                    <WeekDue datas={datas} nextWeek={nextWeek} 
                                     FontAwesomeIcon={FontAwesomeIcon} faFileLines={faFileLines} />
                                </div>
                                </div>
                            </div>
                        </>) : null}
                    </div>
        </div>
            )
}
