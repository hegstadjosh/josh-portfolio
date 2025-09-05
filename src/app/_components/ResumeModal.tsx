"use client";
import { useState, useEffect } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResumeData {
  url: string;
  downloadUrl: string;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Fetch resume URL from our API
      fetch('/api/resume-url')
        .then(res => res.json())
        .then((data: ResumeData) => {
          setResumeData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch resume:', err);
          // Fallback to Google Drive link
          setResumeData({
            url: "https://drive.google.com/file/d/1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn/view?usp=sharing",
            downloadUrl: "https://drive.google.com/uc?id=1bWeAWuQG0B3l66nQZjapkUzA-yV-ugJn&export=download"
          });
          setLoading(false);
        });
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleDownload = () => {
    if (resumeData?.downloadUrl) {
      window.open(resumeData.downloadUrl, '_blank');
    }
  };

  const handleYoureHired = () => {
    const subject = encodeURIComponent("Let's work together!");
    const body = encodeURIComponent(`Hi Joshua,

I just reviewed your portfolio and resume - I'm impressed! Let's discuss how we can work together.

Best regards`);
    
    window.open(`mailto:J.Hegstad@Columbia.edu?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700/50 shadow-2xl max-w-7xl w-full h-[95vh] overflow-hidden flex flex-col ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#012169]  flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#6CACE4] bg-clip-text text-transparent">Joshua Hegstad</h2>
              <p className="text-gray-400 text-sm">Computer Science @ Columbia University</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 p-3 "
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-6 overflow-hidden">
          {loading ? (
            <div className="bg-gray-800/50 border border-gray-700/30  p-8 text-center h-full flex items-center justify-center">
              <div className="max-w-md">
                <div className="w-16 h-16 bg-[#012169]  flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Loading Resume...</h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-6 h-6 border-2 border-[#6CACE4] border-t-transparent "></div>
                  <span className="text-gray-400">Just a moment</span>
                </div>
              </div>
            </div>
          ) : resumeData?.url?.includes('blob.vercel-storage.com') ? (
            <div className="bg-white border border-gray-700/30 shadow-inner overflow-hidden h-full ">
              <iframe
                src={resumeData.url}
                className="w-full h-full border-0 "
                title="Joshua Hegstad Resume"
              />
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700/30  p-8 text-center h-full flex items-center justify-center">
              <div className="max-w-2xl">
                <div className="w-20 h-20 bg-[#012169]  flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Resume Temporarily Unavailable</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  The PDF viewer is currently unavailable, but you can still download the resume or reach out directly!
                </p>
                <div className="bg-gray-800/50 border border-gray-600/30  p-6">
                  <h4 className="font-semibold text-white mb-4 text-lg">Quick Overview:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <h5 className="text-[#6CACE4] font-medium mb-2">Current Roles:</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Research Assistant - Columbia Economics</li>
                        <li>• Software Engineer - Pure Poker</li>
                        <li>• Co-Leader - NASA SUITS Challenge</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-[#6CACE4] font-medium mb-2">Specializations:</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• AR/VR Development</li>
                        <li>• Full-Stack Engineering</li>
                        <li>• AI/ML Solutions</li>
                        <li>• Cybersecurity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-700/50 bg-gray-900/50">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button
              onClick={handleDownload}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#012169] hover:bg-[#012169]/80 text-white  transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span>Download PDF</span>
            </button>
            
            <button
              onClick={handleYoureHired}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#012169] hover:bg-[#012169]/80 text-white  transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5 animate-pulse"
            >
              <span>YOU&apos;RE HIRED!</span>
              <span className="text-xl group-hover:animate-bounce">🎉</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}