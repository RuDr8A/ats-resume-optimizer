import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../../auth/hooks/useAuth.js';


const Archive = () => {

    const navigate = useNavigate()
    const {user, Logout } = useAuth() ;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
        await Logout(); 
        navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const { getReports, reports, loading } = useInterview();

    // Fetch reports when the page loads
    useEffect(() => {
        getReports();
    }, [getReports]);

    // Helper to calculate the smaller SVG circle progress
    const getStrokeOffset = (score) => {
        const circumference = 2 * Math.PI * 20; // radius is 20
        return circumference - (circumference * (score || 0)) / 100;
    };

    return (
        <div className="bg-[#0a0a0a] font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary/30">
            
            {/* HEADER - Consistent with your other pages */}
            <header className="sticky top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
                <div className="h-16 w-full px-8 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-surface text-[20px]">analytics</span>
                        </div>
                        <span className="font-headline-md text-2xl tracking-tight text-primary ml-3 font-medium">
                            <Link to="/dashboard">Resume Optimizer</Link>
                        </span>
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/dashboard" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Dashboard</Link>
                        <Link to="/archive" className="text-xs font-medium text-primary transition-colors uppercase">Archive</Link>
                    </nav>

                    {/* PROFILE DROPDOWN */}
                    <div className="relative flex items-center pl-6 border-l border-white/10">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 hover:bg-white/5 py-1.5 px-2 rounded-full transition-colors focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                            </div>
                            <span className={`material-symbols-outlined text-on-surface-variant text-[16px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {/* DROPDOWN MENU */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-3 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 z-50 flex flex-col overflow-hidden origin-top-right transition-all">
                                <div className="px-4 py-3 border-b border-white/5 mb-1 bg-surface-container-low/30">
                                    <p className="text-sm font-medium text-primary truncate">{user?.username || "User"}</p>
                                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">Active Session</p>
                                </div>
                                
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-colors text-left w-full group"
                                >
                                    <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">logout</span>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full pt-12 pb-16">
                <div className="max-w-7xl mx-auto px-8 flex flex-col gap-10">
                    
                    {/* Page Title */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold text-primary m-0">Interview Archive</h1>
                        <p className="text-sm text-on-surface-variant m-0">
                            Review your previously generated interview strategies and preparation plans.
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : (
                        /* Reports Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                            {/* Empty State */}
                            {(!reports || reports.length === 0) && (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">folder_off</span>
                                    <h3 className="text-lg font-medium text-primary mb-2">No reports found</h3>
                                    <p className="text-sm text-on-surface-variant mb-6">You haven't generated any interview reports yet.</p>
                                    <Link to="/dashboard" className="px-6 py-2.5 bg-primary text-surface rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                                        Generate New Report
                                    </Link>
                                </div>
                            )}

                            {/* Map through the reports */}
                            {reports?.map((report) => (
                                <div key={report._id} className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 flex flex-col hover:border-primary/30 transition-colors group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-primary text-[20px]">work</span>
                                        </div>
                                        
                                        {/* Score Ring */}
                                        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 50 50">
                                                <circle className="text-white/10" cx="25" cy="25" fill="none" r="20" stroke="currentColor" strokeWidth="3"></circle>
                                                <circle className="text-primary" cx="25" cy="25" fill="none" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={getStrokeOffset(report.matchScore)} strokeWidth="3"></circle>
                                            </svg>
                                            <span className="text-sm font-bold text-primary">{report.matchScore || 0}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1 mb-8">
                                        {/* Assuming your backend saves the job title/description */}
                                        <h3 className="text-lg font-medium text-primary m-0 line-clamp-2 leading-snug">
                                            {report.jobDescription || "Software Engineer Role"}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant m-0 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                            {/* Format the date if your DB has createdAt, otherwise generic */}
                                            {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Generated Previously"}
                                        </p>
                                    </div>

                                    <Link 
                                        to={`/interview/${report._id}`}
                                        className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-primary text-center hover:bg-primary hover:text-surface transition-colors"
                                    >
                                        View Full Report
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Archive;