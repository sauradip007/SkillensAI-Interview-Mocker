'use client'
import React, { useState, useEffect } from 'react'
import { db } from '@/utils/db'
import { MockInterviewSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function InterviewStart({params}) {

    const unwrappedParams = React.use(params);
    const [interviewDetails, setInterviewDetails] = useState({});
    const [webCamEnabled, setWebcamEnabled] = useState(false)

    useEffect(()=>{
        console.log("params is : ",params);
        GetInterviewDetails();
        
    },[]);

    const GetInterviewDetails = async() => {
        const resp = await db.select().from(MockInterviewSchema)
        .where(eq(MockInterviewSchema.mockId, params.interviewId));

        setInterviewDetails(resp[0]);
        console.log(resp);
        console.log(typeof(resp))
        console.log(resp[0].jobPosition)
    }
  return (
    <div className='my-10 '>
        <div className='flex justify-center p-5'>
    <h2 className='font-bold text-2xl '>Let's get started</h2>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 p-5 gap-10'>


    <div className='flex flex-col col-span-1'>
        <div className='flex flex-col p-5 my-5 rounded-lg border gap-5'>
        <h2 className='text-lg'><strong>Job Role/ Job Position</strong>  : {interviewDetails.jobPosition} </h2>
        <h2 className='text-lg'><strong>Job Description</strong>  : {interviewDetails.jobDescription} </h2>
        <h2 className='text-lg'><strong>Years of Experience</strong>  : {interviewDetails.jobDescription} </h2>

        </div>
        <div className='rounded-lg border border-yellow-400 bg-yellow-200 p-5'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h1 className='flex gap-2 items-center mt-3 text-yellow-700 items-center'>{process.env.NEXT_PUBLIC_INFORMATION}</h1>
        </div>
    </div>

    <div className='col-span-1 '>
    {
    webCamEnabled ? (
        <Webcam
        mirrored={true}
        onUserMedia = {() => setWebcamEnabled(true)}
        onUserMediaError={() => setWebcamEnabled(false)}
            style={{
                height:300,
                width:300
            }} />
    ) : (
        <>
        <WebcamIcon className='w-full h-72 my-4 p-20 bg-secondary rounded-lg border'/>
        <Button variant='ghost' className='text-center' onClick={()=>setWebcamEnabled(true)}> Enable Webcam and microphone </Button>
        <div className=' mt-3 '>
            <Link href={`/dashboard/interview/${unwrappedParams.interviewId}/start`}>
            <Button>Start Interview</Button>
            </Link>
        
        </div>
        </>
        
    )
}
    </div>
    
    </div>
  

 
    
    </div>
  )
}

export default InterviewStart
