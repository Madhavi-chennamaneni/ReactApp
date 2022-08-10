import React from 'react'
import Alert from './Alert/Alert'
import LearningPath from './LearningPath/LearningPath'
import WorkPath from './WorkPath/WorkPath'

export default function Home() {
  return (
    <div className='homePage'>
      <Alert> </Alert>
      <div className='lpPathSection'>
        <LearningPath> </LearningPath>
        <WorkPath> </WorkPath>
      </div>
    </div>
  )
}
