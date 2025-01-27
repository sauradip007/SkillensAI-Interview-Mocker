import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'


function InterviewCard({interview}) {
    const router = useRouter()

    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId)
    }

    const onFeedback = () => {
        router.push('/dashboard/interview/'+ interview?.mockId + '/feedback')
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-indigo-500'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Year{interview?.jobExperience > 1 ? 's' : ''} of experience</h2>
      <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt ? formatDate(interview.createdAt) : ''}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Button onClick = {onFeedback} className='w-full' size='sm' variant='outline'> Feedback </Button>
        <Button  onClick={onStart} className='w-full' size="sm">Start</Button>
      </div>
    </div>
  )
}

export default InterviewCard
