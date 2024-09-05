import React from 'react'

const Foot = () => {
  return (
    <div>
        <div className='bg-slate-700 text-white  flex flex-col justify-center items-center bottom-0 w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>            
            </div>
            <div className='flex justify-center items-center'>
                <img className='w-4 mx-2' src="icons/copyright.png" alt="" srcset="" />Mahak Agrawal
            </div>
        </div>
    </div>
  )
}

export default Foot
