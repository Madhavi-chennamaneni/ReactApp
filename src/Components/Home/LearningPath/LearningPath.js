import React , { useState, useEffect }from 'react'
import './LearningPath.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus'
import DataTable from 'react-data-table-component';
import useCollapse from 'react-collapsed';
import {Link} from 'react-router-dom'

const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        width: '77px',
        height: '45px',
    },
    {
        name: 'NAME',
        selector: row => row.name,
        width: '169px'
    },
    {
        name: 'TYPE',
        selector: row => row.type,
        width: '90px'
    },
    {
        name: 'DURATION',
        selector: row => row.duration,
        width: '116px'
    },
    {
        name: 'STATUS',
        selector: row => row.status,
        width: '171px'
    },
];

const data = [
    {
        id: 2.1,
        name: "Data Structure 1",
        type: 'MCQ',
        duration: '10 mins',
        status: <button className='btn-submit'> Submitted </button>,
        // width: '77px',
        // height: '45px',
    },
    {
        id: 2.2,
        name: "Data Structure 2",
        type: 'Coding',
        duration: '10 mins',
        status: <button className='btn-due'> <Link to='/codingsection' style={{color:'white', textDecoration:'none'}}> Due </Link> </button>,
    },
]

const customStyles = {
    headCells: {
      style: {
        alignItems: 'center',
        background: '#F8F9FA',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '15px',
        letterSpacing: '0.05em',
        color: '#5F6368',
      },
    },
    cells: {
      style: {
        alignItems: 'center',
        background: 'white',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '17px',
        lineHeight: '20px',
        color: '#202020',
      },
    },
  };

export default function LearningPath() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    
    

  return (
    <div className='card-3'>
        <span className='msg-2'> Learning Program Name </span>
        <button className='module-1'> 
            <span className='module-1-name'> 1. Module 1 Name </span>
            <span className='module-1-date'> Due by : Today </span>
            <FontAwesomeIcon className='plus' icon = {faPlus}>  </FontAwesomeIcon>
         </button>
        
        {/* <button {...getToggleProps()}>
            {isExpanded ?
            <button {...getToggleProps()} className='module-1'> 
                    <span className='module-1-name'> 1. Module 1 Name </span>
                    <span className='module-1-date'> Due by : Today </span>
                    <FontAwesomeIcon className='plus' icon = {faMinus}>  </FontAwesomeIcon>
                </button>:
                <button {...getToggleProps()} className='module-1'> 
                    <span className='module-1-name'> 1. Module 1 Name </span>
                    <span className='module-1-date'> Due by : Today </span>
                    <FontAwesomeIcon className='plus' icon = {faPlus}>  </FontAwesomeIcon>
                </button>} */}
            {/* </button> */}
            {/* <div className='module-1-content' {...getCollapseProps()}>
                <DataTable columns={columns} data={data} customStyles = {customStyles}/>
            </div> */}







        {/* <button {...getToggleProps()}> */}
            {isExpanded ?
            <button {...getToggleProps()} className='module-2'> 
                    <span className='module-2-name'> 2. Module 2 Name </span>
                    <span className='module-2-date'> Due by : Thursday, 22nd July </span>
                    <FontAwesomeIcon className='plus' icon = {faMinus}>  </FontAwesomeIcon>
                </button>:
                <button {...getToggleProps()} className='module-2'> 
                    <span className='module-2-name'> 2. Module 2 Name </span>
                    <span className='module-2-date'> Due by : Thursday, 22nd July </span>
                    <FontAwesomeIcon className='plus' icon = {faPlus}>  </FontAwesomeIcon>
                </button>}
            {/* </button> */}


            <div className='module-2-content' {...getCollapseProps()}>
                <DataTable columns={columns} data={data} customStyles = {customStyles}/>
            </div>
            {/* <button className='module-3'> 
                <span className='module-2-name'> 3. Module 3 Name </span>
                <span className='module-2-date'> Due by : Thursday, 22nd July </span>
            </button> */}
    </div>
  )
}