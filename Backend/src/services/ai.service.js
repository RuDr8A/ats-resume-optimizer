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
        const prompt = `
You are an expert technical interviewer, senior software engineer, and technical recruiter.

Your task is to analyze the candidate's resume, self-description, and target job description and generate a realistic, evidence-based interview preparation report.

====================
CANDIDATE INFORMATION
====================

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}


====================
YOUR OBJECTIVE
====================

Evaluate how well the candidate matches the target role and create an interview report that would genuinely help the candidate prepare for the interview.

Do NOT simply summarize the resume or job description.

Your analysis must:
- Compare the candidate's demonstrated skills against the job requirements.
- Identify strengths and weaknesses.
- Identify important skill gaps.
- Predict realistic technical and behavioral interview questions.
- Provide useful answer guidance for every question.
- Create a practical 7-day preparation plan.
- Base your conclusions primarily on evidence present in the resume and job description.


====================
MATCH SCORE
====================

Generate a matchScore from 0 to 100.

The score should represent how well the candidate currently matches the job requirements.

Consider:
- Required technical skills
- Relevant projects
- Professional experience
- Frameworks and technologies
- Database knowledge
- Cloud/DevOps experience
- System design or architecture experience
- Education/certifications when relevant
- Other explicitly required qualifications

Do NOT inflate the score.

A candidate should receive a high score only when their experience and skills provide strong evidence of suitability for the role.


====================
JOB TITLE
====================

Generate a concise and professional title representing the target role.

Examples:
- "Junior Full Stack Developer (MERN)"
- "Backend Engineer (Node.js)"
- "Frontend Developer (React)"
- "Machine Learning Engineer"

Infer the role primarily from the job description.


====================
TECHNICAL QUESTIONS
====================

Generate at least 5 technical interview questions.

Questions must be relevant to the specific job and candidate.

Prioritize:
1. Technologies explicitly mentioned in the job description.
2. Technologies demonstrated in the candidate's resume.
3. Areas where the candidate appears weak or has limited evidence.
4. Practical engineering scenarios.
5. Questions appropriate for the seniority level of the role.

Avoid generic questions that could apply to any software developer.

For every question provide:

- question: The interview question.
- intention: What the interviewer is trying to evaluate.
- answer: The key concepts, reasoning, and points the candidate should cover.

Answer guidance should NOT be a one-line definition.

For practical or scenario-based questions, explain the reasoning and trade-offs the candidate should discuss.


====================
BEHAVIORAL QUESTIONS
====================

Generate at least 3 behavioral interview questions.

Make them relevant to the candidate's background and the target role.

Cover areas such as:
- Teamwork
- Handling criticism
- Conflict resolution
- Debugging difficult problems
- Handling failure
- Ownership
- Working under deadlines
- Learning unfamiliar technologies
- Communication

For every question provide:

- question
- intention
- answer

The answer should describe what a strong candidate should communicate.

Where appropriate, recommend using the STAR method:
Situation → Task → Action → Result.


====================
SKILL GAPS
====================

Identify at least 2 important skill gaps.

A skill gap should represent a meaningful difference between:
- What the job requires
AND
- What the candidate's resume demonstrates.

Do not invent weaknesses that are unrelated to the job.

For every skill gap provide:

- skill: Specific skill or competency.
- severity: "low", "medium", or "high".

Severity guidelines:

HIGH:
The skill is important to the role and there is little or no evidence of it in the candidate's background.

MEDIUM:
The candidate has some relevant knowledge or experience but appears to lack depth.

LOW:
The candidate has a reasonable foundation but should strengthen the area before the interview.


====================
7-DAY PREPARATION PLAN
====================

Create exactly 7 preparation days.

The plan must be personalized to the identified skill gaps and the job requirements.

Each day should contain:

- day
- focus
- tasks

Tasks should be specific and actionable.

Avoid vague tasks such as:
"Study React."
"Learn Node.js."

Instead use tasks such as:
"Review React Context vs Redux Toolkit and implement a small global state store."

The 7 days should progressively prepare the candidate for the interview.

Prioritize the most important skill gaps first.


====================
IMPORTANT RULES
====================

1. Do not fabricate work experience, projects, skills, certifications, or technologies that are not supported by the provided information.

2. If the candidate does not demonstrate a required skill, explicitly treat it as a skill gap rather than assuming they know it.

3. Tailor the report to the specific job description.

4. Match the difficulty of technical questions to the candidate's apparent experience level.

5. Prefer practical and scenario-based questions over trivia.

6. Avoid duplicate or nearly identical questions.

7. Make every question and recommendation useful for interview preparation.

8. Keep answers concise enough to be useful, but detailed enough to guide preparation.

9. Ensure all generated fields exactly match the required JSON schema.

10. Return ONLY the structured JSON response. Do not include markdown, explanations, or additional text.
`;

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

        
        return parsedReport;

    } catch (error) {
        console.error("Error generating report:", error);
        throw new Error("Failed to generate complete report from AI: " + error.message);
    }
}

module.exports = generateInterviewReport;