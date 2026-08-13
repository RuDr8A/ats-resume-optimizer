
import { Link } from 'react-router-dom';
// import { useInterview } from '../../hooks/useInterview'; // Uncomment when connecting to backend

const Interview = () => {
    // const { report, loading } = useInterview(); // Uncomment when connecting to backend

    // TEMPORARY DUMMY DATA FOR UI TESTING
    const loading = false;
    const report = {
        matchScore: 55,
        title: "Mid-Level Full Stack Developer (MERN)",
        summary: "Comprehensive analysis of candidate fit, technical proficiency, and recommended preparation strategy based on the interview transcript.",
        matchFactors: [
            { text: "React, Node, MongoDB", type: "positive" },
            { text: "Production experience", type: "negative" },
            { text: "Cloud deployment", type: "negative" }
        ],
        skillGaps: [
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },
            { 
                skill: "Advanced State Management", 
                severity: "medium",
                description: "Struggled with complex state structures.",
                action: "Implement global state in a test app"
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            }
        ],
        technicalQuestions: [
            {
                question: "Can you explain the difference between Redux and React Context API?",
                intention: "To assess the candidate's understanding of state management.",
                answer: "Context API is built into React and is ideal for low-frequency updates. Redux provides a centralized global store suitable for complex apps."
            },
            {
                question: "Explain how you would optimize the performance of a React application.",
                intention: "To test advanced React capabilities and performance optimization techniques.",
                answer: "Use React.memo for component memoization, useMemo and useCallback hooks to cache expensive calculations, and implement virtualization for long lists."
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            }
        ],
        behavioralQuestions: [
            {
                question: "How do you handle receiving critical feedback on your code?",
                intention: "To evaluate teamwork and adaptability.",
                answer: "Express a growth-minded attitude, viewing code reviews as learning opportunities."
            },
            {
                question: "Describe a situation where you had to learn a new technology quickly.",
                intention: "To assess fast-learning capabilities and resourcefulness.",
                answer: "I rely on active learning strategies, building MVPs, and reading official documentation rather than getting stuck in tutorial hell."
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            }
        ],
        preparationPlan: [
            {
                day: 1,
                focus: "React State Management & Performance",
                tasks: [
                    "Study Redux Toolkit and implement a simple state store.",
                    "Review React performance optimization APIs."
                ]
            },
            {
                day: 2,
                focus: "Advanced Node.js & Backend Architecture",
                tasks: [
                    "Build a robust Express boilerplate incorporating centralized error handling.",
                    "Practice modeling relationships in MongoDB."
                ]
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },
            { 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            },{ 
                skill: "Professional Full-Stack Experience", 
                severity: "high",
                description: "Limited production evidence.",
                action: "Build and deploy a full-stack project"
            }
        ]
    };

    if (loading || !report) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-primary font-medium">Loading your report...</span>
                </div>
            </div>
        );
    }

    // Dynamic Helpers
    const strokeDashoffset = 283 - (283 * report.matchScore) / 100;

    const getSeverityStyles = (severity) => {
        if (severity === 'high') return { border: 'border-[#ffb4ab]/30', bg: 'bg-[#ffb4ab]/5', iconBg: 'bg-[#ffb4ab]/10', text: 'text-[#ffb4ab]', icon: 'priority_high' };
        if (severity === 'medium') return { border: 'border-[#ffca28]/30', bg: 'bg-[#ffca28]/5', iconBg: 'bg-[#ffca28]/10', text: 'text-[#ffca28]', icon: 'remove' };
        return { border: 'border-primary/30', bg: 'bg-primary/5', iconBg: 'bg-primary/10', text: 'text-primary', icon: 'check' };
    };

    return (
        <div className="bg-[#0a0a0a] font-body-md text-on-surface min-h-screen flex flex-col selection:bg-primary/30">
            
            {/* HEADER - Sticky */}
            <header className="sticky top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
                <div className="h-16 w-full px-8 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-surface text-[20px]">analytics</span>
                        </div>
                        <span className="font-headline-md text-2xl tracking-tight text-primary ml-3 font-medium">ReportAI</span>
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/dashboard" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Dashboard</Link>
                        <a href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Interviews</a>
                        <a href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors uppercase">Archive</a>
                    </nav>

                    <div className="flex items-center pl-6 border-l border-white/10 cursor-pointer group">
                        <button className="flex items-center gap-2 hover:bg-white/5 py-1 px-2 rounded-full transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                            </div>
                            <span className="material-symbols-outlined text-on-surface-variant text-[16px]">expand_more</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full pt-8 pb-16">
                <div className="max-w-7xl mx-auto px-8 flex flex-col gap-8">
                    
                    {/* HERO SECTION */}
                    <div className="w-full bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                        
                        <div className="flex flex-col gap-6 z-10 w-full lg:w-3/5">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary tracking-wider uppercase flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span> AI ANALYSIS
                                </span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-on-surface-variant tracking-wider uppercase">
                                    Interview Report
                                </span>
                                <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    Generated Today
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl lg:text-4xl font-semibold text-primary m-0">{report.title}</h1>
                                <p className="text-base text-on-surface-variant max-w-2xl m-0 leading-relaxed">
                                    {report.summary}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-surface rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Download PDF
                                </button>
                                {/* Restored Share Report Button */}
                                <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-on-surface rounded-lg font-medium text-sm hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                    Share Report
                                </button>
                            </div>
                        </div>
                        
                        {/* Match Score & Breakdown Indicator */}
                        <div className="z-10 flex flex-col sm:flex-row items-center gap-8 shrink-0 w-full lg:w-2/5 justify-end">
                            <div className="flex flex-col gap-3 bg-black/40 p-5 rounded-xl border border-white/5 w-full sm:w-auto">
                                <h3 className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-1">Match Breakdown</h3>
                                <div className="flex flex-col gap-2">
                                    {report.matchFactors.map((factor, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className={`material-symbols-outlined text-[16px] mt-0.5 ${factor.type === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                                                {factor.type === 'positive' ? 'add_circle' : 'do_not_disturb_on'}
                                            </span>
                                            <span className="text-sm text-on-surface-variant">{factor.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-white/10" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4"></circle>
                                    <circle className="text-primary transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset={strokeDashoffset} strokeWidth="6"></circle>
                                </svg>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-bold text-primary tabular-nums leading-none">{report.matchScore}</span>
                                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center mt-1">Moderate<br/>Match</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MASONRY / GRID LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-1 flex flex-col gap-8">
                            
                            {/* Skill Gaps (Scrollable) */}
                            <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 flex flex-col max-h-[500px]">
                                <div className="flex items-center justify-between shrink-0 mb-6 pb-4 border-b border-white/5">
                                    <h2 className="text-xl font-semibold text-primary m-0">Skill Gaps Identified</h2>
                                    <span className="material-symbols-outlined text-on-surface-variant">warning</span>
                                </div>
                                <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar pb-2 pr-2">
                                    {report.skillGaps.map((gap, index) => {
                                        const styles = getSeverityStyles(gap.severity);
                                        return (
                                            <div key={index} className={`flex flex-col gap-3 p-4 rounded-lg border ${styles.border} ${styles.bg}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0`}>
                                                        <span className={`material-symbols-outlined ${styles.text} text-[18px]`}>{styles.icon}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-base text-primary font-medium">{gap.skill}</span>
                                                        <span className={`text-[10px] font-bold ${styles.text} uppercase tracking-wider`}>{gap.severity} Severity</span>
                                                    </div>
                                                </div>
                                                <div className="pl-11 flex flex-col gap-2">
                                                    <p className="text-sm text-on-surface-variant/80 m-0">{gap.description}</p>
                                                    <div className="flex items-center gap-1.5 text-xs text-primary/90 bg-white/5 p-2 rounded w-fit">
                                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                        <span>Action: {gap.action}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Preparation Plan (Scrollable) */}
                            <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 flex flex-col max-h-[600px]">
                                <div className="flex items-center justify-between shrink-0 mb-6 pb-4 border-b border-white/5">
                                    <h2 className="text-xl font-semibold text-primary m-0">Preparation Plan</h2>
                                    <span className="text-xs text-on-surface-variant font-medium">0/{report.preparationPlan.length} complete</span>
                                </div>
                                <div className="relative pl-6 border-l border-white/10 flex flex-col gap-8 overflow-y-auto no-scrollbar pb-4">
                                    {report.preparationPlan.map((plan, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-low"></div>
                                            <div className="flex flex-col gap-3">
                                                <div>
                                                    <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-1">Day {plan.day}</span>
                                                    <h3 className="text-base text-primary font-medium m-0">{plan.focus}</h3>
                                                </div>
                                                <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                                                    {plan.tasks.map((task, tIndex) => (
                                                        <li key={tIndex} className="flex items-start gap-3 text-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors group">
                                                            <span className="material-symbols-outlined text-[20px] text-on-surface-variant/50 shrink-0 mt-0.5 group-hover:text-primary transition-colors">
                                                                radio_button_unchecked
                                                            </span>
                                                            {task}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            
                            {/* Technical Assessment (Scrollable) */}
                            <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 flex flex-col max-h-[600px]">
                                <div className="flex items-center gap-4 pb-4 border-b border-white/5 justify-between shrink-0 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">terminal</span>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-primary m-0">Technical Assessment</h2>
                                    </div>
                                    <span className="px-3 py-1 bg-white/5 rounded text-xs font-medium text-on-surface-variant tracking-wider uppercase">Technical</span>
                                </div>
                                <div className="flex flex-col gap-8 overflow-y-auto no-scrollbar pr-4 pb-4">
                                    {report.technicalQuestions.map((q, index) => (
                                        <div key={index} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-start gap-3">
                                                    <span className="text-xs text-primary/50 uppercase font-bold tracking-widest w-6 mt-1">
                                                        {String(index + 1).padStart(2, '0')}.
                                                    </span>
                                                    <h3 className="text-lg text-primary font-medium m-0 leading-snug">{q.question}</h3>
                                                </div>
                                                <div className="flex items-center gap-3 pl-9">
                                                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50">lightbulb</span>
                                                    <p className="text-sm text-on-surface-variant/70 italic m-0">Intention: {q.intention}</p>
                                                </div>
                                            </div>
                                            <div className="ml-9 p-6 rounded-lg bg-white/5 border border-white/5 relative">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 rounded-l-lg"></div>
                                                <p className="text-sm text-on-surface m-0 leading-relaxed">{q.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Behavioral Assessment (Scrollable) */}
                            <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 flex flex-col max-h-[600px]">
                                <div className="flex items-center gap-4 pb-4 border-b border-white/5 justify-between shrink-0 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">psychology</span>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-primary m-0">Behavioral Assessment</h2>
                                    </div>
                                    <span className="px-3 py-1 bg-white/5 rounded text-xs font-medium text-on-surface-variant tracking-wider uppercase">Behavioral</span>
                                </div>
                                <div className="flex flex-col gap-8 overflow-y-auto no-scrollbar pr-4 pb-4">
                                    {report.behavioralQuestions.map((q, index) => (
                                        <div key={index} className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-start gap-3">
                                                    <span className="text-xs text-primary/50 uppercase font-bold tracking-widest w-6 mt-1">
                                                        {String(index + 1).padStart(2, '0')}.
                                                    </span>
                                                    <h3 className="text-lg text-primary font-medium m-0 leading-snug">{q.question}</h3>
                                                </div>
                                                <div className="flex items-center gap-3 pl-9">
                                                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50">lightbulb</span>
                                                    <p className="text-sm text-on-surface-variant/70 italic m-0">Intention: {q.intention}</p>
                                                </div>
                                            </div>
                                            <div className="ml-9 p-6 rounded-lg bg-white/5 border border-white/5 relative">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 rounded-l-lg"></div>
                                                <p className="text-sm text-on-surface m-0 leading-relaxed">{q.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Interview;