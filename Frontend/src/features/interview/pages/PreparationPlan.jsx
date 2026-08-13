import { useState, useEffect } from 'react';

const PreparationPlan = ({ planData, interviewId }) => {

    
    // 1. Calculate the total number of tasks across all days
    const totalTasks = planData?.reduce((total, plan) => total + (plan.tasks?.length || 0), 0) || 0;

    // 2. Initialize state by checking localStorage first
    const [completedTasks, setCompletedTasks] = useState(() => {
        try {
            const saved = localStorage.getItem(`prep-plan-${interviewId}`);
            return saved ? new Set(JSON.parse(saved)) : new Set();
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            return new Set();
        }
    });

    // 3. Save to localStorage every time a task is toggled
    useEffect(() => {
        // Convert Set to Array for JSON stringification
        localStorage.setItem(`prep-plan-${interviewId}`, JSON.stringify([...completedTasks]));
    }, [completedTasks, interviewId]);

    // 4. Toggle function
    const toggleTask = (taskId) => {
        setCompletedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(taskId)) {
                newSet.delete(taskId);
            } else {
                newSet.add(taskId);
            }
            return newSet;
        });
    };

    if (!planData || planData.length === 0) return null;

    return (
        <div className="bg-surface-container-low/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 flex flex-col max-h-[600px]">
            <div className="flex items-center justify-between shrink-0 mb-6 pb-4 border-b border-white/5">
                <h2 className="text-xl font-semibold text-primary m-0">Preparation Plan</h2>
                <span className="text-xs text-on-surface-variant font-medium bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
                    {completedTasks.size}/{totalTasks} complete
                </span>
            </div>
            
            <div className="relative pl-6 border-l border-white/10 flex flex-col gap-8 overflow-y-auto no-scrollbar pb-4">
                {planData.map((plan, dayIndex) => (
                    <div key={dayIndex} className="relative">
                        <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-surface-container-low"></div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block mb-1">Day {plan.day}</span>
                                <h3 className="text-base text-primary font-medium m-0">{plan.focus}</h3>
                            </div>
                            <ul className="flex flex-col gap-3 m-0 p-0 list-none mt-2">
                                {plan.tasks?.map((task, taskIndex) => {
                                    // Create a unique ID for each task based on its day and index
                                    const taskId = `day-${dayIndex}-task-${taskIndex}`;
                                    const isCompleted = completedTasks.has(taskId);

                                    return (
                                        <li 
                                            key={taskIndex} 
                                            onClick={() => toggleTask(taskId)}
                                            className="flex items-start gap-3 text-sm cursor-pointer group transition-all"
                                        >
                                            <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 transition-colors ${
                                                isCompleted 
                                                    ? 'text-primary' 
                                                    : 'text-on-surface-variant/50 group-hover:text-primary/70'
                                            }`}
                                            
                                            style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : {}}
                                            >
                                                {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                            
                                            <span className={`leading-relaxed transition-all duration-300 ${
                                                isCompleted 
                                                    ? 'text-on-surface-variant/40 line-through' 
                                                    : 'text-on-surface-variant group-hover:text-on-surface'
                                            }`}>
                                                {task}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreparationPlan;