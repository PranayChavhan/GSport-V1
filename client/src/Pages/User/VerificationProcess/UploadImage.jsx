import React from 'react'
import { Link } from 'react-router-dom';

const UploadImage = () => {
  return (
    <div>
        
        UploadImage
        
        <Link to={"/user/v-progress"}><p className='text-blue-400 font-bold underline text-2xl'>
            Check Progress
          </p></Link>

    </div>
  )
}

export default UploadImage;