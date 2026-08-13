import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/interview/pages/Home"
import Protected from "../features/auth/components/protected";
import Interview from "../features/interview/pages/Interview"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Protected> <Home/></Protected>}/>
      <Route path="/report" element={<Interview/>}/>
      

    </Routes>
        
  );
};

export default AppRoutes;