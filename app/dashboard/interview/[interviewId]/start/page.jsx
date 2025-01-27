'use client'
import React, { useState, useEffect } from 'react'
import { db } from '@/utils/db'
import { MockInterviewSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import QuestionSection from './_components/QuestionSection'
import RecordAnswer from './_components/RecordAnswer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {

    const [interviewDetails, setInterviewDetails] = useState({});
    const[mockInterviewQuestion,setMockInterviewQuestion] = useState()
    const [activeQuestion,setActiveQuestion] = useState(0)
    useEffect(()=>{
      // we only need the jsonmockresponse
        // console.log("params is : ",params);

        GetInterviewDetails()


    },[])

    const GetInterviewDetails = async() => {


    //   try {
    //     // Log the interviewId we're querying with
    //     console.log("Querying with interviewId:", params.interviewId);

    //     const resp = await db.select().from(MockInterviewSchema)
    //         .where(eq(MockInterviewSchema.mockId, params.interviewId));
        
    //     // Log the raw response
    //     console.log("Raw DB response:", resp);
        
    //     if (!resp || resp.length === 0) {
    //         console.error("No data found for this interview ID");
    //         return;
    //     }

    //     // Log the jsonMockResponse before parsing
    //     console.log("Raw jsonMockResponse:", resp[0].jsonMockResponse);

    //     const jsonMockResponse = JSON.parse(resp[0].jsonMockResponse);
        
    //     // Log the parsed response
    //     console.log("Parsed jsonMockResponse:", jsonMockResponse);
        
    //     if (!jsonMockResponse.interview_questions) {
    //         console.error("Response structure:", Object.keys(jsonMockResponse));
    //         throw new Error("interview_questions not found in response");
    //     }

    //     setMockInterviewQuestion(jsonMockResponse.questions);
    //     setInterviewDetails(resp[0]);
    // } catch (error) {
    //     console.error("Full error details:", error);
    // }
        const resp = await db.select().from(MockInterviewSchema)
        .where(eq(MockInterviewSchema.mockId, params.interviewId));

        // setting mockinterview question as the jsonresponse obtrained
        const jsonMockResponse = JSON.parse(resp[0].jsonMockResponse)
        setMockInterviewQuestion(jsonMockResponse.interview_questions);
        console.log("resp is : ", resp[0]);
        console.log("json mock response: ",JSON.parse(resp[0].jsonMockResponse))
        console.log("Interview Questions : ",jsonMockResponse.questions)

        console.log(typeof(resp))
        console.log(resp[0].jobPosition)
        // setting Interview details as the entire object obtained as a part of mockinterviewschema
        setMockInterviewQuestion(jsonMockResponse.questions);
        setInterviewDetails(resp[0])
    }
  return (
    // dividing screen into 2 halves for question and video
    <div className='p-5'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      {/* Question Section */}
      <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestion={activeQuestion} />

      {/* Video Section */}
      <RecordAnswer mockInterviewQuestion={mockInterviewQuestion} activeQuestion={activeQuestion} interviewDetails={interviewDetails}/>
    </div>

    <div className='flex justify-end gap-6'>
            {activeQuestion > 0 && 
            <Button onClick={()=> setActiveQuestion(activeQuestion-1)}>Previous Question</Button>}
            {activeQuestion !== mockInterviewQuestion?.length-1  && 
            <Button onClick={()=> setActiveQuestion(activeQuestion+1)}>Next Question</Button>}
             {activeQuestion === mockInterviewQuestion?.length-1 && 
             <Link href={`/dashboard/interview/${interviewDetails?.mockId}/feedback`}>
             <Button>End Interview</Button>
             </Link>}
        </div>
    </div>
  )
}

export default StartInterview
