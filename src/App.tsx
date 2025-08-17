import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AccessControl from "./pages/AccessControl";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import RecruiterDetails from "./pages/RecruiterDetails";
import AdminManagment from "./pages/AdminManagment";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/recruiters/:id" element={<RecruiterDetails />} />
            <Route path="/admin-management" element={<AdminManagment />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
