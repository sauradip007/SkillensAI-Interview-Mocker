
'use client'
import { db } from '@/utils/db'
import { UserAnswerSchema } from '@/utils/schema'
import {React, useState, useEffect} from 'react'
import { eq } from 'drizzle-orm'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {

    const[feedbackList, setFeedbackList] = useState([])
    const router = useRouter()
    useEffect (()=>{
        GetFeedback()
    },[])

const GetFeedback = async() => {
    const result = await db.select()
    .from(UserAnswerSchema)
    .where(eq(UserAnswerSchema.mockIdRef,params.interviewId))



    console.log("interviewId:", params.interviewId);

    console.log("Result is : ", result)
    console.log("Type of result is : ", typeof(result))
    setFeedbackList(result)
    console.log("feedback list is : ", feedbackList)
}

  return (
    <div className='p-10'>


      {feedbackList.length == 0  ? 
        <h2 className='text-xl font-bold text-gray-500'>No interview record found</h2> :
        <>
        <h2 className='text-3xl font-bold text-green-400'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback </h2>
        <h2 className='text-indigo-500 text-lg my-3'> Your overall score is {(feedbackList.reduce((acc, item) => acc + Number(item.rating), 0) / feedbackList.length).toFixed(1)}/10    </h2>
      <h2 className='text-gray-500 text-sm'>Here is your feedback and scope of improvement</h2>
      {feedbackList && feedbackList.map((item,index)=>(
        <Collapsible className='mt-7' key={index}>
        <CollapsibleTrigger className='p-2 bg-secondary my-2 rounded-lg text-left w-full'>{item?.question}  <ChevronsUpDownIcon className='h-5 w-5'/></CollapsibleTrigger>
        <CollapsibleContent>
         <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item?.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Ideal Answer: </strong>{item?.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-indigo-50 text-sm text-indigo-900'><strong>Feedback: </strong>{item?.feedback}</h2>
         </div>
        </CollapsibleContent>
      </Collapsible>

      ))}
        </>

      }


      <Button onClick = {()=> router.replace('/dashboard')} className='mt-5 rounded-lg'>Go Home</Button>
      
    </div>
  )
}

export default Feedback
