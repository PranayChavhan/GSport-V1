import React from 'react'
import { Link } from 'react-router-dom'

const VProgress = () => {
  return (
    <div>Verification progress page
        <Link to={"/features"}>
            <p className='text-blue-400 font-bold text-2xl underline'>Explore Features</p>
        </Link>
    </div>
  )
}

export default VProgress