'use client'
import { Volume2 } from 'lucide-react'
import {React, useEffect} from 'react'

function QuestionSection({mockInterviewQuestion, activeQuestion}) {
    useEffect(() => {
        console.log("Interview Questions from QuestionSection : ", mockInterviewQuestion)
    }, [])

    const textToSpeech = (mockInterviewQuestion) => {


        

        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(mockInterviewQuestion)
            window.speechSynthesis.speak(speech)
        } else {
            alert("Sorry your browser does not supporty  teext to speech")
        }
    }

    return mockInterviewQuestion &&  (
        <div className='h-[calc(100vh-12rem)] rounded-lg p-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 
                        className={`p-2 text-center bg-secondary rounded-full cursor-pointer transition-colors
                            ${activeQuestion == index ? 'bg-black-500 text-white' : 'bg-secondary hover:bg-indigo-100'}`} 
                        key={index}
                    >
                        Question #{index + 1}
        
                    </h2>
                ))}
            </div>

            <h2 className='my-5 text-sm md:text-md'>{mockInterviewQuestion[activeQuestion]?.question}</h2>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestion]?.question)} />
        </div>
    )
}

export default QuestionSection
