const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

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

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

   const prompt = `
    You are an expert Executive Resume Writer and ATS (Applicant Tracking System) Specialist. Your task is to rewrite and format a candidate's resume to perfectly align with a target job description, outputting the result as production-ready HTML.

    ====================
    INPUT DATA
    ====================
    ORIGINAL RESUME:
    ${resume}

    CANDIDATE'S SELF DESCRIPTION:
    ${selfDescription}

    TARGET JOB DESCRIPTION:
    ${jobDescription}

    ====================
    CONTENT INSTRUCTIONS
    ====================
    1. Tailor the Content: Rewrite bullet points and the summary to highlight the candidate's software engineering strengths and experiences that directly match the Job Description. Use relevant keywords from the JD organically.
    2. Metric-Driven: Quantify achievements where possible (e.g., performance improvements, algorithmic efficiency, system scalability), but base them ONLY on the provided data.
    3. Human-Like Tone: Write clearly and professionally using strong action verbs. Avoid robotic, overly generic AI jargon (e.g., "synergized," "testament to").
    4. Strict Accuracy (NO HALLUCINATIONS): DO NOT invent jobs, degrees, metrics, tech stacks, or skills that the candidate does not actually have.
    5. Conciseness: Keep the length strictly to 1-2 pages when converted to an A4 PDF. Focus on high-impact achievements rather than unnecessary fluff.

    ====================
    DESIGN & HTML/CSS INSTRUCTIONS (PUPPETEER READY)
    ====================
    1. ATS-Friendly Structure: Use clean, semantic HTML tags (<h1>, <h2>, <ul>, <li>, <p>). Avoid complex nested tables or messy CSS grid layouts that confuse ATS parsers.
    2. Styling: Include a <style> block directly in the <head>. Do not use external CSS links.
    3. Typography & Color: Use standard, web-safe fonts (e.g., Arial, Helvetica, Roboto, or Georgia). You may use subtle accent colors (e.g., deep blue or dark slate) for headers, but keep the overall design minimalist, clean, and highly professional.
    4. Formatting: Ensure proper margins, padding, and line height so it renders beautifully in a headless browser (Puppeteer) generating a standard A4 PDF.

    ====================
    OUTPUT FORMAT
    ====================
    Return ONLY a valid JSON object with a single field "html".
    The value of "html" must be a complete HTML document (starting with <!DOCTYPE html>).
    Crucially, ensure all quotes and special characters within the HTML string are properly escaped so the resulting JSON is valid and can be parsed programmatically.

    {
    "html": "<!DOCTYPE html><html><head><style>...</style></head><body>...</body></html>"
    }
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }

