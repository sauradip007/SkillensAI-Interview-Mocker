'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// export default function Home() {
//   return (
    
//     <div>
//       Hello
//       <div>
//       <Button color="primary">Click me</Button>
//       </div>
//     </div>
//   );    
// }

export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">


        {/* Hero Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Personal AI Interview Coach
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Double your chances of landing that job offer with our AI-powered interview prep
          </p>
          <div className="flex justify-center gap-4">
            
            <Button onClick={()=> router.push('/dashboard')} className="bg-indigo-600 hover:bg-indigo-700">
              Get Started →
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4 10.5l-6 3.5V7l6 3.5z" />
              </svg>
              Watch video
            </Button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wide mb-6">
            FEATURED IN
          </p>
          <div className="flex justify-center items-center gap-12">
            <div className="text-gray-400 flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z" />
              </svg>
              YouTube
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                <path d="M15.5 7H14V5.5c0-.3-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5V7H8.5c-.3 0-.5.2-.5.5v3c0 .3.2.5.5.5H10v1.5c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5V11h1.5c.3 0 .5-.2.5-.5v-3c0-.3-.2-.5-.5-.5z" />
              </svg>
              Product Hunt
            </div>
            <div className="text-gray-400 flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
              reddit
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-2">How it Works?</h2>
          <p className="text-gray-600 text-center mb-12">
            Give mock interview in just 3 simple easy step
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Write prompt for your form</h3>
              <p className="text-gray-600">
                Create your custom interview questions and scenarios tailored to your needs.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Edit Your form</h3>
              <p className="text-gray-600">
                Customize and refine your interview preparation materials as needed.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Start Accepting Responses</h3>
              <p className="text-gray-600">
                Begin receiving feedback and practicing your interview responses.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Get Started Today
          </Button>
        </div>
      </main>
    </div>
  );
};
