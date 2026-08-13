import { useContext, useCallback } from "react";
import { InterviewContext } from "../interview.context";
import { 
    getAllInterviewReports, 
    generateInterviewReport, 
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = useCallback(async ({jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({  jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.error("Failed to generate report:", error);
            return null; 
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getReportById = useCallback(async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.error("Failed to fetch report by ID:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getReports = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReports;
        } catch (error) {
            console.error("Failed to fetch all reports:", error);
            return []; 
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReports]);

    const getResumePdf = useCallback(async (interviewReportId) => {
        
        
        try {
            const response = await generateResumePdf({ interviewReportId });
            
           
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
            const link = document.createElement("a");
            
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportId}.pdf`);
            
            
            document.body.appendChild(link);
            link.click();
            link.remove(); 
            window.URL.revokeObjectURL(url); 
            
        } catch (error) {
            console.error("Failed to download resume PDF:", error);
            alert("Failed to generate your ATS Resume. Please try again.");
        } 
    }, []);

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports ,
        getResumePdf
    };
};