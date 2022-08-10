import React from 'react'
import './Alert.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation'

export default function Alert() {
  return (
    <div>
        <div className="cardAlert">
            <span className="cardLine" ></span>
            <span className='msg'> 
                <FontAwesomeIcon className='dangerIcon' icon={faTriangleExclamation}/> You have 3 Assignments over due. 
            </span> 
        </div>
    </div>
  )
}
