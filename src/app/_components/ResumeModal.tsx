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
        .then(data => {
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
    const subject = encodeURIComponent("Let's work together! 🚀");
    const body = encodeURIComponent(`Hi Joshua,

I just reviewed your portfolio and resume - I'm impressed! Let's discuss how we can work together.

Best regards`);
    
    window.open(`mailto:J.Hegstad@Columbia.edu?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Joshua Hegstad - Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="p-6 flex-1 min-h-[500px]">
          {loading ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
              <div className="max-w-md">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Loading Resume...</h3>
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              </div>
            </div>
          ) : resumeData?.url && resumeData.url.includes('blob.vercel-storage.com') ? (
            <div className="bg-gray-100 rounded-lg overflow-hidden min-h-[500px]">
              <iframe
                src={resumeData.url}
                className="w-full h-[500px] border-0"
                title="Joshua Hegstad Resume"
              />
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
              <div className="max-w-md">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Preview</h3>
                <p className="text-gray-600 mb-6">
                  Computer Science student at Columbia University with experience in AR/AI development, 
                  full-stack programming, and cybersecurity.
                </p>
                <div className="space-y-4">
                  <div className="text-left bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Recent Experience:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Research Assistant - Columbia Economics Dept</li>
                      <li>• Software Engineer - Pure Poker</li>
                      <li>• Co-Leader - NASA SUITS Challenge</li>
                      <li>• Software Engineer - AMLAH</li>
                      <li>• Cybersecurity Intern - Hess Corporation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <span>Download Resume</span>
          </button>
          
          <button
            onClick={handleYoureHired}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="text-xl">🎉</span>
            <span>YOU'RE HIRED!</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>

        {/* Fun note */}
        <div className="px-6 pb-4 text-center">
          <p className="text-sm text-gray-500">
            📧 The "YOU'RE HIRED!" button will compose an email to get the conversation started!
          </p>
        </div>
      </div>
    </div>
  );
}