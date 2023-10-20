/* eslint-disable no-unused-vars */
import React from 'react'
import TeamDetails from '../../../Pages/Player/Participation/TeamDetails'
import CustomizedSteppers from '../CustomizedSteppers'

const Step3 = () => {
  return (
    <div>
        <CustomizedSteppers step={2} />
    <div className='my-5'>
<TeamDetails/>
    </div>
    </div>
  )
}

export default Step3