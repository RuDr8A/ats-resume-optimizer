const pdfParse = require("pdf-parse"); // Standard package usage
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    console.log("Hi 1")
    try {
       
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required." });
        }
        const { selfDescription, jobDescription, title } = req.body;
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const resumeContentText = resumeContent.text;

        
        console.log("Hi 2")

        if (!title || !selfDescription || !jobDescription) {
            return res.status(400).json({ 
                message: "Please provide title, selfDescription, and jobDescription fields." 
            });
        }

        console.log("Hi 3")
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContentText,
            selfDescription,
            jobDescription
        });

        console.log("Hi 4")
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContentText,
            title, 
            selfDescription,
            jobDescription,
            ...interViewReportByAi 
        });
        
        console.log(interViewReportByAi)
        console.log(interviewReport)

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to generate interview report.",
            error: error.message
        });
    }
}

module.exports = { generateInterViewReportController };
