import React from 'react'

const OverDue = ({ datas, currentWeek, FontAwesomeIcon, faFileLines }) => {
    const currentDate = new Date();
    const filteredData = datas.filter(data => (((Math.ceil((new Date(data.dueDate).getDate() + 6 - new Date(data.dueDate).getDay()) / 7)) === currentWeek) || ((Math.ceil((new Date(data.dueDate).getDate() + 6 - new Date(data.dueDate).getDay()) / 7)) === currentWeek - 1)))
    return (
        <div>
            <div className='overdueHead'>
                <h3 className='overDue'>Overdue</h3>
                <span className="badge">{filteredData.length} </span>
            </div><hr />
            {filteredData.map(data => (
                <>
                    <div className='overDueList'>
                        <FontAwesomeIcon className='icon' icon={faFileLines} />
                        <h4 className='exerciseName'>{data.name}</h4>
                    </div>
                    <div className='dueDate'>
                        <span className='date'>Due {data.dueDate}</span>
                        <li className="remainingDay">
                            {/*  {<Moment from={new Date()} ago>{new Date(data.dueDate)}</Moment>} to go */}
                            {
                                ((new Date(data.dueDate).getDate() - currentDate.getDate()) >=1) ? (`${(new Date(data.dueDate).getDate() - currentDate.getDate())} days to go`) : `Late`
                            }
                        </li>
                    </div></>))}
            <br />
        </div>
    )
}

export default OverDue