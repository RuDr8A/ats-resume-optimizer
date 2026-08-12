
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import '../pages/auth.form.scss';
const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <div className="spinner"></div> 
            </div>
        );
    }

    
    if (!user) {
        return <Navigate to="/login" replace />; 
    }

    
    return children;
};

export default Protected;