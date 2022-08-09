import React from 'react'

const WeekDue = ({ datas, nextWeek, FontAwesomeIcon, faFileLines }) => {
  const currentDate = new Date();
  return (
    <div>
      {datas.map(data => ((Math.ceil((new Date(data.dueDate).getDate() + 6 - new Date(data.dueDate).getDay()) / 7)) === nextWeek) ? (
        <>
          <div className='overDueList'>
            <FontAwesomeIcon className='icon' icon={faFileLines} />
            <h4 className='exerciseName'>{data.name}</h4>
          </div>
          <div className='dueDate'>
            <span className='date'>Due {data.dueDate}</span>
            <li key={data.id} className="remainingDay">
              {
                ((new Date(data.dueDate).getDate() - currentDate.getDate()) >1) ? (`${(new Date(data.dueDate).getDate() - currentDate.getDate())} days to go`) : `Late`
              }
            </li>
          </div>
        </>) : null)}
      <br />
    </div>
  )
}

export default WeekDue
