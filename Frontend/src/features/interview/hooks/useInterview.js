import { useContext, useCallback } from "react";
import { InterviewContext } from "../interview.context";
import { 
    getAllInterviewReports, 
    generateInterviewReport, 
    getInterviewReportById 
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
            return null; // Safely return null if the API fails
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
            return []; // Safely return an empty array on failure
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReports]);

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports 
    };
};