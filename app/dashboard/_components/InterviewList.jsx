'use client'
import { db } from '@/utils/db'
import { MockInterviewSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import {React, useState, useEffect} from 'react'
import InterviewCard from './InterviewCard'

function InterviewList() {

    const {user} = useUser()
    const[interviewList, setInterviewList] = useState([])

    useEffect(()=>{
        user && GetInterviewList()
    },[user])

    const GetInterviewList = async()=>{
        const result = await db.select()
        .from(MockInterviewSchema)
        .where(eq(MockInterviewSchema.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterviewSchema.id))

        console.log("Prev interview list : ",result)
        console.log("Type of prev interview list : ",typeof(result))

        setInterviewList(result)
    }
  return (
    <div>
    <div>
      <h2 className='font-medium text-xl'>Previous Interview List</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {interviewList && interviewList.map((interview,index) => (
            <InterviewCard interview={interview} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
