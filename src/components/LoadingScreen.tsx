import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [loadingMessage, setLoadingMessage] = useState('Initializing analysis...');
  const loadingMessages = [
    'Initializing analysis...',
    'Reading job description...',
    'Scanning resume content...',
    'Extracting key skills and experience...',
    'Matching qualifications with job requirements...',
    'Calculating compatibility scores...',
    'Generating detailed insights...',
    'Finalizing results...'
  ];

  useEffect(() => {
    if (!isLoading) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[currentIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-3xl"></div>
      
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 blur-lg animate-pulse"></div>
        <div className="absolute inset-2 border-t-4 border-l-4 border-transparent border-r-4 border-purple-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-4 border-t-4 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 border-b-4 border-transparent border-r-4 border-indigo-400 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
      </div>
      
      <h2 className="text-3xl font-bold mb-6 text-white">Processing <span className="gradient-text">Your Documents</span></h2>
      
      <div className="relative w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
      </div>
      
      <p className="text-gray-300 text-center max-w-md mb-10 text-lg">
        {loadingMessage}
      </p>
      
      <div className="flex items-center space-x-3 text-sm text-purple-400">
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>This may take a minute or two</span>
      </div>
    </div>
  );
};

export default LoadingScreen; 