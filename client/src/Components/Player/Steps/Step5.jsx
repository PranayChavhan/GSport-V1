/* eslint-disable no-unused-vars */
import React from 'react'
import MatchDetails from '../../../Pages/Player/Participation/MatchDetails'
import CustomizedSteppers from '../CustomizedSteppers'

const Step5 = () => {
  return (
    <div>
        <CustomizedSteppers step={4} />
    <div className='my-5'>
<MatchDetails/>
    </div>
    </div>
  )
}

export default Step5