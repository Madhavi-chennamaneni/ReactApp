import React from 'react'

const Problems = ({data}) => {
  return (
    <div className='problem'>
        <h2>Exercise {data.id}</h2>
        <p>{data.problemstatement}</p>
        <h2> Example I/O </h2>
        <p> {data.exampleio} </p>
    </div>
  )
}

export default Problems