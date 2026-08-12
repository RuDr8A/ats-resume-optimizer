import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/auth/pages/HomePage"
import Protected from "../features/auth/components/protected";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
  path="/dashboard" 
  element={
    <Protected>
      <Home />
    </Protected>
  } 
/>

    </Routes>
  );
};

export default AppRoutes;