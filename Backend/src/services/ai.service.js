const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        title: { 
            type: Type.STRING, 
            description: "The title of the job for which the report is generated" 
        },
        matchScore: { 
            type: Type.NUMBER, 
            description: "A score between 0 and 100" 
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "List of technical questions with intention and answer guidance",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The interview question" },
                    intention: { type: Type.STRING, description: "Why the interviewer asks this" },
                    answer: { type: Type.STRING, description: "Points to cover in the answer" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "List of behavioral questions with intention and answer guidance",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question" },
                    intention: { type: Type.STRING, description: "Why the interviewer asks this" },
                    answer: { type: Type.STRING, description: "Points to cover in the answer" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps identified",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The lacking skill name" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"], 
                        description: "Impact level" 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "Day-wise interview preparation guide",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "Day number starting from 1" },
                    focus: { type: Type.STRING, description: "Main topic or area of focus" },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING }, 
                        description: "Tasks to accomplish on this day" 
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `You are an expert technical interviewer and recruiter. Generate a comprehensive interview report for a candidate with the following details:

                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        CRITICAL INSTRUCTIONS:
                        1. Generate at least 5 'technicalQuestions'. Each item MUST be an object with 'question', 'intention', and 'answer'.
                        2. Generate at least 3 'behavioralQuestions'. Each item MUST be an object with 'question', 'intention', and 'answer'.
                        3. Identify at least 2 'skillGaps'. Each item MUST be an object with 'skill' and 'severity' ('low', 'medium', or 'high').
                        4. Create a 7-day 'preparationPlan'. Each item MUST be an object with 'day', 'focus', and 'tasks' (an array of strings).`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema,
                temperature: 0.7,
                maxOutputTokens: 8192
            }
        });

        const parsedReport = JSON.parse(response.text);

        
        return {
            jobDescription,
            resume,
            selfDescription,
            ...parsedReport
        };

    } catch (error) {
        console.error("Error generating report:", error);
        throw new Error("Failed to generate complete report from AI: " + error.message);
    }
}

module.exports = generateInterviewReport;