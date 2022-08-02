import React from 'react'
import './WorkPath.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons/faFileCircleQuestion'
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines'
import { faComments } from '@fortawesome/free-regular-svg-icons/faComments'
import { faFile } from '@fortawesome/free-regular-svg-icons/faFile'

export default function WorkPath() {
  return (
    <div className='card-4'>
        <div className='card-5'>  <hr />
            <button className='dropdown'> 
                Work To Do 
                <FontAwesomeIcon className='downIcon' icon={faChevronDown}/>
            </button>
            <div className='overdue'> 
                Overdue 
                <span class="badge"> 3 </span>
            </div> <br /> <hr />
            <div className=''>  
                <FontAwesomeIcon className='file-qn' icon={faFileCircleQuestion}>  </FontAwesomeIcon>
                <span className='file-qn-text'> JavaScript Quiz </span> <br />
                <span className='file-qn-date'> Due Jul. 30 
                    <li> 4 days to go </li> 
                </span>
                <FontAwesomeIcon className='file' icon={faFileLines}>  </FontAwesomeIcon>
                <span className='file-text'> JavaScript Book Report </span> <br />
                <span className='file-date'> Due Aug. 02
                    <li> 6 days to go </li> 
                </span>
                <FontAwesomeIcon className='comment' icon={faComments}>  </FontAwesomeIcon>
                <span className='comment-text'> JavaScript Class Discussion </span> <br />
                <span className='comment-date'> Due Aug. 07
                    <li> 10 days to go </li> 
                </span>
                <div className='due-date'>
                    August 10 - February 18
                </div> <br /> <br /> <br /> <br /> <br /> <br /> <hr />
            </div>
            <div>
                <FontAwesomeIcon className='file-qn-2' icon={faFileCircleQuestion}>  </FontAwesomeIcon>
                <span className='file-qn-text'> Algebra and Fractions Pop Quiz </span> <br />
                <span className='file-qn-date-2'> Due Aug. 12 
                    <li className='li-2'> Grade 5 Mathematics </li> 
                </span>
                <FontAwesomeIcon className='file-2' icon={faFile}>  </FontAwesomeIcon>
                <span className='file-text-2'> Class Feedback Survey </span> <br />
                <span className='file-date-2'> Due Aug. 15
                    <li className='li-2'> Classroom Announcements </li> 
                </span>
                <FontAwesomeIcon className='file-3' icon={faFileLines}>  </FontAwesomeIcon>
                <span className='file-text-3'> Candiate History </span> <br />
                <span className='file-date-3'> Due Aug. 15
                    <li className='li-2'> Candiate History </li> 
                </span>
            </div> <br /> <br /> <br /> <br /> <br /> <br /> 
            <a className='view-link' href="#"> View all work </a>  <hr className='last-hr' />
        </div>
    </div>
  )
}