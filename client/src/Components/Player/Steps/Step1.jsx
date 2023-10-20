/* eslint-disable no-unused-vars */
import React from 'react'
import GameDetails from '../../../Pages/Player/Participation/GameDetails'
import CustomizedSteppers from '../CustomizedSteppers'


const Step1 = () => {
  return (
    <div>
        <CustomizedSteppers step={0} />
        <div className='my-5'>
        <GameDetails/>
        </div>
        
    </div>
  )
}

export default Step1