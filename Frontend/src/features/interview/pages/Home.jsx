import { useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useInterview } from '../hooks/useInterview.js';
const Home = () => {

    const { loading: isLoading, generateReport } = useInterview();
    const navigate = useNavigate();

    // Form States
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Drag & Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setResumeFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
        }
    };

    // 2. Cleaned up Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) return alert("Please upload a resume first!");

        // We use the 'resumeFile' directly from your state here!
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        
        // If the report generates successfully, navigate to it
        if (data && data._id) {
            navigate(`/interview/${data._id}`);
        } else {
            alert("Failed to generate report. Please try again.");
        }
    };

    return (
        <div className="bg-[#0a0a0a] font-body-md text-on-surface min-h-screen no-scrollbar">
            
            {/* HEADER / NAVBAR */}
            <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/60 backdrop-blur-xl border-b border-white/10">
                <div className="h-16 w-full px-8 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-surface text-[20px]">analytics</span>
                        </div>
                        <span className="font-headline-md text-2xl tracking-tight text-primary ml-3 font-medium"><Link to = "/dashboard">Resume Optimizer</Link></span>
                    </div>
                    <nav className="flex items-center gap-8">
                        <a href="#" className="transition-colors uppercase text-primary font-medium text-sm">Dashboard</a>
                        <a href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Archive</a>
                        <div className="flex items-center gap-6 ml-4 pl-6 border-l border-white/10">
                            <a href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Sign Out</a>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative w-full pt-16 min-h-screen flex flex-col items-center justify-center p-6">
                
                {/* Decorative background elements */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                    <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-surface-tint/10 rounded-full blur-[120px]"></div>
                </div>

                {/* Main Glassmorphic Card */}
                <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container-low/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-10">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    
                    <div className="p-8 md:p-12">
                        
                        {/* Header Section */}
                        <div className="mb-10 text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container mb-2 overflow-hidden ">
                                <span className="material-symbols-outlined text-[24px] " style={{ fontVariationSettings: "'FILL' 1" }}> <img src="https://img.magnific.com/premium-vector/abstract-circle-icon-vector_942802-5348.jpg?semt=ais_test_b&w=740&q=80" alt="" /> </span>
                            </div>
                            <h1 className="font-headline-xl text-4xl text-primary tracking-tight font-semibold">Generate Interview Report</h1>
                            <p className="text-on-surface-variant max-w-lg mx-auto text-sm">
                                Input your target role details and candidate profile to synthesize a comprehensive interview strategy and report.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8 relative">
                            
                            {/* Job Description Input */}
                            <div className="space-y-3 group relative">
                                <label className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider font-medium" htmlFor="jobDescription">
                                    <span className="material-symbols-outlined text-[16px] text-surface-tint">work</span>
                                    Job Description
                                </label>
                                <div className="relative">
                                    <textarea 
                                        id="jobDescription" 
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full bg-surface-dim/80 text-on-surface p-4 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-y placeholder:text-on-surface-variant/50" 
                                        placeholder="Paste the full job description here..." 
                                        required 
                                        rows="5"
                                    />
                                    <div className="absolute bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-500 ease-out group-focus-within:w-full rounded-b-xl"></div>
                                </div>
                            </div>

                            {/* Self Description Input */}
                            <div className="space-y-3 group relative">
                                <label className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider font-medium" htmlFor="selfDescription">
                                    <span className="material-symbols-outlined text-[16px] text-surface-tint">person_pin</span>
                                    Self Description / Key Traits
                                </label>
                                <div className="relative">
                                    <textarea 
                                        id="selfDescription" 
                                        value={selfDescription}
                                        onChange={(e) => setSelfDescription(e.target.value)}
                                        className="w-full bg-surface-dim/80 text-on-surface p-4 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-y placeholder:text-on-surface-variant/50" 
                                        placeholder="Briefly describe your key strengths, background, or specific areas you want the AI to focus on..." 
                                        required 
                                        rows="4"
                                    />
                                    <div className="absolute bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-500 ease-out group-focus-within:w-full rounded-b-xl"></div>
                                </div>
                            </div>

                            {/* Resume Upload Dropzone */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs text-primary uppercase tracking-wider font-medium">
                                    <span className="material-symbols-outlined text-[16px] text-surface-tint">upload_file</span>
                                    Resume Upload
                                </label>
                                <div 
                                    className={`relative group cursor-pointer w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-300 overflow-hidden ${isDragging ? 'border-primary bg-surface-dim/80' : 'border-white/10 bg-surface-dim/40 hover:border-primary/40 hover:bg-surface-dim/80'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    />
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <span className={`material-symbols-outlined text-[32px] transition-colors duration-300 z-10 ${resumeFile ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {resumeFile ? 'task' : 'note_add'}
                                    </span>
                                    
                                    <div className="text-center z-10">
                                        <span className={`block ${resumeFile ? 'text-primary font-medium' : 'text-primary'}`}>
                                            {resumeFile ? resumeFile.name : 'Drag & drop or click to upload'}
                                        </span>
                                        <span className="text-xs text-on-surface-variant block mt-1">PDF only (Max 5MB)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="pt-6 relative">
                                {/* Glow Effect */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-full bg-primary/20 blur-xl rounded-full mix-blend-screen transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}></div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className={`relative w-full py-4 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden ${isLoading ? 'bg-surface-variant text-on-surface cursor-not-allowed' : 'bg-primary text-on-primary hover:bg-primary/90'}`}
                                >
                                    {!isLoading ? (
                                        <span className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                                            Generate Report
                                            <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;