/* eslint-disable no-unused-vars */
import React from 'react'
import RosterDetails from '../../../Pages/Player/Participation/RosterDetails'
import CustomizedSteppers from '../CustomizedSteppers'

const Step4 = () => {
  return (
    <div>
        <CustomizedSteppers step={3} />
    <div className='my-5'>
<RosterDetails/>
    </div>
    </div>
  )
}

export default Step4