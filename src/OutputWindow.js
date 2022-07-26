import React from 'react'

const OutputWindow = (Props) => {
  return (
    <div className='outputWindow'>
        <h2 className='outputHead'>#Output</h2>
        <div className='output'>
          {Props.CodeOutput}
        </div>
    </div>
  )
}

export default OutputWindow
