"use client"
import Webcam from 'react-webcam';
import Image from 'next/image'
import {React, useState, useEffect} from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from "sonner"
import { chatSession } from '@/utils/GeminiModel'
import { db } from '@/utils/db';
import { UserAnswerSchema } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment'

 function RecordAnswer({mockInterviewQuestion, activeQuestion, interviewDetails}) {
const [userAnswer, setUserAnswer] = useState('')
const[loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    const {user} = useUser()

    useEffect(()=>{

        results.map((result)=> setUserAnswer(prevAns => prevAns  + result?.transcript))

      }, [results])

    useEffect(()=> {

        if(!isRecording && userAnswer.length > 10)
        {
            UpdateUserAnswer()
        }

        
        // if(userAnswer?.length < 10){
        //     setLoading(false)
        //     toast.error("Error in recording your answer please try again later")
        //     return;
        // }

    },[userAnswer])



    
    const UpdateUserAnswer =  async () => {
        setLoading(true)
        console.log("User ans resp up is : ", userAnswer)

            // stopSpeechToText()

            // if(userAnswer?.length < 10){
            //     setLoading(false)
            //     toast("Error in recording your answer please try again later")
            //     return;
            // }

            // setUserAnswer('')
            const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestion]?.question + " , " + 
            "User Answer: " + userAnswer + "." + "Based on the user's answer on the interview question , provide a suitable rating out of 5 and feedback as areas of improvement if any"
            + "in 3 to 5 lines to improve on it in JSON format with rating field and feedback field."

            const mockResponse = await chatSession.sendMessage(feedbackPrompt)

            const MockJSONResp = JSON.parse(mockResponse.response.text().replace('```json', '').replace('```', ''));

            console.log("type of MockJsonresp : ", typeof(MockJSONResp))
            console.log("mockResponse : ", MockJSONResp)


           const resp =  await db.insert(UserAnswerSchema).values({
                mockIdRef: interviewDetails?.mockId,
                question: mockInterviewQuestion[activeQuestion]?.question,
                correctAns: mockInterviewQuestion[activeQuestion]?.answer,
                userAns: userAnswer,
                feedback: MockJSONResp?.feedback,
                rating: MockJSONResp?.rating,
                userEmail:user,
                createdAt:moment().toDate(),


            })

            console.log("User ans resp is : ", resp[0])

            if(resp)
            {
                toast.success('User Answer saved successfully')
                setUserAnswer('')
                setResults([])
            }

            setUserAnswer('')
            setResults([])
            setLoading(false)
    }

      const SaveUserAnswer = async () => {

        if(isRecording) {
            // it should load here
            // setLoading(true)

            stopSpeechToText()

            // await new Promise(resolve => setTimeout(resolve, 1000));

        //     const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestion]?.question + " , " + 
        //     "User Answer: " + userAnswer + "." + "Based on the user's answer on the interview question , provide a suitable rating out of 5 and feedback as areas of improvement if any"
        //     + "in 3 to 5 lines to improve on it in JSON format with rating field and feedback field."

        //     const mockResponse = await chatSession.sendMessage(feedbackPrompt)

        //     const MockJSONResp = JSON.parse(mockResponse.response.text().replace('```json', '').replace('```', ''));

        //     console.log("type of MockJsonresp : ", typeof(MockJSONResp))
        //     console.log("mockResponse : ", MockJSONResp)


        //    const resp =  await db.insert(UserAnswerSchema).values({
        //         mockIdRef: interviewDetails?.mockId,
        //         question: mockInterviewQuestion[activeQuestion]?.question,
        //         correctAns: mockInterviewQuestion[activeQuestion]?.answer,
        //         userAns: userAnswer,
        //         feedback: MockJSONResp?.feedback,
        //         rating: MockJSONResp?.rating,
        //         userEmail:user,
        //         createdAt:moment().toDate(),


        //     })

        //     console.log("User ans resp is : ", resp[0])

        //     if(resp)
        //     {
        //         toast.success('User Answer saved successfully')
        //     }

        //     setUserAnswer('')
        //     setLoading(false)




        } else{
            startSpeechToText()
        }
      }


  return (
    <div>
    <div className='flex flex-col justify-center items-center rounded-lg bg-secondary h-[calc(100vh-12rem)] w-full p-10'>
        <Image src={'/webcam.png'} width={200} height={200} alt={'webcam-image'} className='absolute'/>
        <Webcam mirrored style={{
            height: '100%',
            width: '100%',
            zIndex: 10,
            objectFit: 'cover',
        }} />
        
    </div>
    <div className='flex justify-center my-5'>
        <Button disabled={loading} onClick={SaveUserAnswer} className='items-center'variant="outline">
            {isRecording ? 
            <h2 className='text-red-600'>
                <Mic/> Recording...
            </h2> :
            'Record Answer'
            }
        </Button>
        {/* <Button onClick={()=> console.log(userAnswer)}>Show Answer</Button> */}
        </div>

    </div>
    
    

  )
}

export default RecordAnswer
