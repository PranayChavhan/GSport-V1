/* eslint-disable no-unused-vars */
import React from 'react'
import Participate from '../../../Pages/Player/Participation/Participate'
import CustomizedSteppers from '../CustomizedSteppers'

const Step2 = () => {
  return (
    <div>
        <CustomizedSteppers step={1} />
    <div className='my-5'>
<Participate/>
    </div>
    </div>
  )
}

export default Step2