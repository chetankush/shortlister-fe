import { useState } from 'react';

interface SkillScore {
  skill: string;
  score: number;
  required: boolean;
}

interface ResultsData {
  overallScore: number;
  decision: 'selected' | 'review' | 'rejected';
  skills: SkillScore[];
  experienceYears: number;
  requiredExperience: number;
  educationMatch: boolean;
  locationMatch: boolean;
}

interface ResultsViewProps {
  resultsData: ResultsData;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ resultsData, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'selected':
        return 'bg-green-900/30 text-green-400 border border-green-800';
      case 'review':
        return 'bg-yellow-900/30 text-yellow-400 border border-yellow-800';
      case 'rejected':
        return 'bg-red-900/30 text-red-400 border border-red-800';
      default:
        return 'bg-gray-800 text-gray-400 border border-gray-700';
    }
  };

  const getDecisionText = (decision: string) => {
    switch (decision) {
      case 'selected':
        return 'Recommended to Shortlist';
      case 'review':
        return 'Needs Manual Review';
      case 'rejected':
        return 'Not Recommended';
      default:
        return 'Unknown';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-4xl bg-[#0a0a0a] rounded-xl shadow-lg p-8 my-8 border border-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/5 to-indigo-600/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/5 to-indigo-600/5 blur-3xl pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Candidate <span className="gradient-text">Assessment Results</span></h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          Start New Analysis
        </button>
      </div>
      
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div className="flex items-center">
            <div className={`text-5xl font-bold ${getScoreColor(resultsData.overallScore)}`}>
              {resultsData.overallScore}%
            </div>
            <div className="ml-3 text-gray-400">
              Overall Match
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-full ${getDecisionColor(resultsData.decision)} ml-0 sm:ml-auto`}>
            {getDecisionText(resultsData.decision)}
          </div>
        </div>
        
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`absolute inset-y-0 left-0 rounded-full`}
            style={{ 
              width: `${resultsData.overallScore}%`,
              background: `linear-gradient(to right, ${
                resultsData.overallScore >= 80 ? '#10b981' : 
                resultsData.overallScore >= 60 ? '#f59e0b' : '#ef4444'
              }, ${
                resultsData.overallScore >= 80 ? '#34d399' : 
                resultsData.overallScore >= 60 ? '#fbbf24' : '#f87171'
              })` 
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium mb-4 text-white">Experience</h3>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Candidate has</p>
              <p className="font-medium text-white">
                {resultsData.experienceYears} years 
                <span className="ml-1 text-xs text-gray-500">
                  (Required: {resultsData.requiredExperience} years)
                </span>
              </p>
            </div>
          </div>
          <div className={`ml-13 text-sm ${resultsData.experienceYears >= resultsData.requiredExperience ? 'text-green-400' : 'text-red-400'}`}>
            {resultsData.experienceYears >= resultsData.requiredExperience ? 'Meets requirements' : 'Below required experience'}
          </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-medium mb-4 text-white">Qualifications</h3>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Education Match</p>
              <p className="font-medium text-white">
                {resultsData.educationMatch ? 'Required education present' : 'Missing education requirements'}
              </p>
            </div>
          </div>
          <div className={`ml-13 text-sm ${resultsData.educationMatch ? 'text-green-400' : 'text-yellow-400'}`}>
            {resultsData.educationMatch ? 'Qualification criteria met' : 'Consider reviewing education background'}
          </div>
        </div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white flex items-center">
          <span className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 mr-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </span>
          Skills Analysis
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <svg className={`w-4 h-4 ml-1 transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {showDetails && (
        <div className="border border-gray-800 rounded-xl overflow-hidden mb-8 bg-[#0a0a0a]">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-[#111111]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Skill</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Match</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {resultsData.skills.map((skill, index) => (
                <tr key={index} className="hover:bg-[#111111] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{skill.skill}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="relative w-24 h-2 bg-gray-800 rounded-full mr-3">
                        <div 
                          className={`absolute inset-y-0 left-0 rounded-full`} 
                          style={{ 
                            width: `${skill.score}%`,
                            background: `linear-gradient(to right, ${
                              skill.score >= 80 ? '#10b981' : 
                              skill.score >= 50 ? '#f59e0b' : '#ef4444'
                            }, ${
                              skill.score >= 80 ? '#34d399' : 
                              skill.score >= 50 ? '#fbbf24' : '#f87171'
                            })` 
                          }}
                        />
                      </div>
                      <span className={getScoreColor(skill.score)}>{skill.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {skill.required ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-400 border border-red-800">Required</span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400 border border-gray-700">Preferred</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-6 sm:mb-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location Match</p>
            <p className={`font-medium ${resultsData.locationMatch ? 'text-green-400' : 'text-yellow-400'}`}>
              {resultsData.locationMatch ? 'Location requirements met' : 'Location mismatch - check if remote work possible'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-white transition-colors text-sm border border-gray-700 px-4 py-2 rounded-full hover:border-gray-600"
        >
          Run Another Analysis
        </button>
      </div>
    </div>
  );
};

export default ResultsView; 