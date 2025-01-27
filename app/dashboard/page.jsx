import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='text-3xl text-indigo-500 font-bold'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and start your AI mock interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
        <AddNewInterview />
        </div>

        {/* Previous Interviews */}
        <InterviewList/>
      
    </div>
  )
}

export default Dashboard
