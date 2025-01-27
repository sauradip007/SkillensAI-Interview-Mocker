"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiModel'
import { MockInterviewSchema } from '@/utils/schema'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useUser } from '@clerk/nextjs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ClerkLoading } from '@clerk/nextjs'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'

function AddNewInterview() {
    const [open, setOpen] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setjobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [JSONResponse, setJSONResponse] = useState('');
    const {user} = useUser();
    const router = useRouter();

     const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('submitted');
        console.log(jobPosition, jobDesc, jobExperience);
        const prompt = `Given , job description as ${jobPosition} and skills listed as : ${jobDesc} and years of experience as ${jobExperience} give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions asked and their answers in JSON format`;
         
        const response = await chatSession.sendMessage(prompt);
        const MockJSONResp = response.response.text().replace('```json', '').replace('```', '');
        
        console.log(JSON.parse(MockJSONResp));
        setJSONResponse(MockJSONResp); //storing the JSON response in string format

        if(MockJSONResp){
        const resp = await db.insert(MockInterviewSchema)
        .values({
            mockId: uuidv4(),
            jsonMockResponse: MockJSONResp,
            jobPosition: jobPosition,
            jobDescription: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().toDate(),


        }).returning({mockId: MockInterviewSchema.mockId})

        console.log("Inserted ID : ",resp);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
    }
    else{
        console.log("ERROR response from AI");
    }
        setLoading(false);
        setOpen(false);
    }
    
    return (
        <div>
            <div 
                className='border border-gray-200 rounded-lg p-10 bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300' 
                onClick={() => setOpen(true)}
            >
                <h2 className='font-bold text-lg'>+ Add New Interview</h2>
            </div>
            
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>
                            Tell us more about the job you are applying for
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Add details about your job position/role, job description and years of experience
                        </p>
                        
                        <div className="space-y-2">
                            <label 
                                htmlFor='job-title' 
                               className="text-sm font-medium"
                            >
                                Job Role/ Job Position
                            </label>
                            <Input 
                                id="job-title"
                                placeholder='Ex. Fullstack Developer' 
                                required
                                onChange={(e) => setJobPosition(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label 
                                htmlFor='job-title' 
                                className="text-sm font-medium"
                            >
                                Job Description/ Tech stack
                            </label>
                            <Textarea
                                id="job-description"
                                placeholder='Ex. MERN stack, React, Node.js, MongoDB, Express, etc.' 
                                required
                                onChange={(e) => setJobDesc(e.target.value)}
                            />  
                        </div>

                        <div className="space-y-2">
                            <label 
                                htmlFor='job-title' 
                                className="text-sm font-medium"
                            >
                                Years of Experience
                            </label>
                            <Input 
                                id="years-of-experience"
                                type='number'
                                placeholder='Ex. 2' 
                                required
                                onChange={(e) => setjobExperience(e.target.value)}
                            />
                        </div>
                        
                        <div className='flex justify-end gap-2'>
                            <Button 
                                variant="ghost"
                                type='button'
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type='submit' disabled={loading}>{loading ?
                            <>
                                <LoaderCircle className='animate-spin'/> 
                                Generating AI response...
                            </>
                                : 'Start Interview'}</Button>
                        </div>
                    </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview