import React, { useState, useEffect } from 'react'

//{CodeOutput,problems,data,seconds,setSeconds,handleSubmit}

const OutputWindow = (Props) => {
  const [seconds, setSeconds] = useState(Props.data.maxtime);
  console.log(Props.data.maxtime)
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else if (seconds === 0) {
        clearInterval(timer)
        alert('you have reached your time limit')
        Props.handleSubmit()
      }
    }, 1000)

    return () => {
      clearInterval(timer);
    }
  })

  return (
    <div className='outputWindow'>
      <div className='timer'>
        <span className='outputHead'>#Output</span>
        <span className='outputHead'>Time left : {`${(Math.floor(seconds / 3600))}h:${Math.floor(seconds % 3600 / 60)}m:${Math.floor(seconds % 3600 % 60)}s`}</span>
      </div>
      <div className='output'>
        {Props.CodeOutput}
      </div>
    </div>
  )
}

export default OutputWindow
