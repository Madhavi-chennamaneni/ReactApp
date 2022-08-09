import React from 'react'
import Alert from './Alert/Alert'
import LearningPath from './LearningPath/LearningPath'
import WorkPath from './WorkPath/WorkPath'

export default function Home() {
  return (
    <div style={{height:'740px'}}>
      <Alert> </Alert>
      <LearningPath> </LearningPath>
      <WorkPath> </WorkPath>
    </div>
  )
}
