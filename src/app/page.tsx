'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FileDropBox from '@/components/FileDropBox';
import LoadingScreen from '@/components/LoadingScreen';
import ResultsView from '@/components/ResultsView';

enum Step {
  INPUT,
  PROCESSING,
  RESULTS
}

// Mock data for demonstration
const mockResultsData = {
  overallScore: 78,
  decision: 'review' as const,
  skills: [
    { skill: 'JavaScript', score: 92, required: true },
    { skill: 'React', score: 88, required: true },
    { skill: 'TypeScript', score: 75, required: false },
    { skill: 'Node.js', score: 65, required: false },
    { skill: 'SQL', score: 60, required: true },
    { skill: 'AWS', score: 40, required: false },
  ],
  experienceYears: 3,
  requiredExperience: 2,
  educationMatch: true,
  locationMatch: false,
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INPUT);
  const [jobDescription, setJobDescription] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  
  const handleAnalyze = () => {
    if ((jobDescription || jobDescriptionText) && (resume || resumeText)) {
      setCurrentStep(Step.PROCESSING);
      // Simulate API call delay
      setTimeout(() => {
        setCurrentStep(Step.RESULTS);
      }, 5000);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(Step.INPUT);
    setJobDescription(null);
    setJobDescriptionText('');
    setResume(null);
    setResumeText('');
  };
  
  const isSubmitDisabled = !((jobDescription || jobDescriptionText) && (resume || resumeText));

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {currentStep === Step.PROCESSING && <LoadingScreen isLoading={true} />}
      
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h1 className="ml-2 text-xl font-bold text-white">JobSort<span className="gradient-text">AI</span></h1>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors px-3 py-2 text-sm font-medium">Products</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors px-3 py-2 text-sm font-medium">Resources</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors px-3 py-2 text-sm font-medium">Customers</a>
            <a href="#" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity px-4 py-2 rounded-full text-sm font-medium text-white ml-2">Book a Demo</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentStep === Step.INPUT && (
          <>
            <div className="px-4 py-12 sm:px-0 mb-12 text-center max-w-4xl mx-auto relative">
              {/* Decorative elements that resemble the Scale website */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-3xl"></div>
              
              <h1 className="text-5xl font-bold mb-6">
                Power <span className="gradient-text">Resume Shortlisting</span><br />
                With Your <span className="gradient-text">Data</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                Make the best hiring decisions with the best data. JobSort AI leverages your enterprise data, 
                and with GenAI Platform, safely unlocks the value of AI.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:space-x-8 px-4 sm:px-0 mb-12 relative">
              <div className="flex-1 mb-8 lg:mb-0">
                <FileDropBox
                  title="Job Description"
                  subtitle="Upload a job description file or paste the text"
                  fileType="jd"
                  onFileChange={setJobDescription}
                  onTextChange={setJobDescriptionText}
                />
              </div>
              
              <div className="flex-1">
                <FileDropBox
                  title="Resume"
                  subtitle="Upload a candidate's resume or paste the text"
                  fileType="resume"
                  onFileChange={setResume}
                  onTextChange={setResumeText}
                />
              </div>
            </div>
            
            <div className="flex justify-center mt-8 px-4 sm:px-0 mb-20">
              <button
                onClick={handleAnalyze}
                disabled={isSubmitDisabled}
                className={`px-8 py-3 rounded-full text-white font-medium text-lg ${
                  isSubmitDisabled 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'gradient-button'
                }`}
              >
                Analyze Match
              </button>
            </div>
            
            <div className="mt-16 px-4 sm:px-0 border-t border-gray-800 pt-16">
              <h2 className="text-2xl font-semibold text-white mb-8 text-center">How JobSort AI Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0a0a0a] shadow-lg rounded-xl p-6 text-center card-hover-effect border border-gray-800">
                  <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-gradient-to-r from-purple-600/10 to-indigo-600/10">
                    <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">1. Upload Documents</h3>
                  <p className="text-gray-400">Upload the job description and candidate's resume in any common format or paste text directly.</p>
                </div>
                
                <div className="bg-[#0a0a0a] shadow-lg rounded-xl p-6 text-center card-hover-effect border border-gray-800">
                  <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-gradient-to-r from-purple-600/10 to-indigo-600/10">
                    <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">2. AI Processing</h3>
                  <p className="text-gray-400">Our advanced AI analyzes skills, experience, and qualifications to match them with requirements.</p>
                </div>
                
                <div className="bg-[#0a0a0a] shadow-lg rounded-xl p-6 text-center card-hover-effect border border-gray-800">
                  <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-gradient-to-r from-purple-600/10 to-indigo-600/10">
                    <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">3. Get Results</h3>
                  <p className="text-gray-400">Receive detailed match scores and hiring recommendations within seconds.</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {currentStep === Step.RESULTS && (
          <div className="flex flex-col items-center px-4 sm:px-0">
            <ResultsView
              resultsData={mockResultsData}
              onReset={handleReset}
            />
          </div>
        )}
      </main>
      
      <footer className="border-t border-gray-800 mt-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                <span className="text-sm">Privacy Policy</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                <span className="text-sm">Terms of Service</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                <span className="text-sm">Contact Us</span>
              </a>
            </div>
            <p className="mt-8 text-center md:mt-0 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} JobSort AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
