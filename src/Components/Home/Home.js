import React from 'react'
import Alert from './Alert/Alert'
import LearningPath from './LearningPath/LearningPath'
import WorkPath from './LearningPath/WorkPath'

export default function Home() {
  return (
    <div>
      {/* <Alert/> */}
      <div className='exerciseSection'>
        <LearningPath/> 
        <WorkPath/>
      </div>
    </div>
  )
}
