import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/interview/pages/Home"
import Protected from "../features/auth/components/Protected";
import Interview from "../features/interview/pages/Interview"
import Archive from "../features/interview/pages/Archive"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected><Home/></Protected>}/>
      <Route path="/interview/:interviewId" element={<Protected><Interview/></Protected>}/>
      <Route path="/archive" element={<Protected><Archive/></Protected>}/>
    </Routes>
  );
};

export default AppRoutes;