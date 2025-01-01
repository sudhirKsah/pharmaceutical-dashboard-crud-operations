import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Medicines from './pages/Medicines';
import DashboardLayout from './pages/DashboardLayout';
import { MedicalStores } from './pages/MedicalStores';
import { Sales } from './pages/Sales';
import { Orders } from './pages/Orders';
import { Inventory } from './pages/Inventory';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="medicines" element={<Medicines />} />
          <Route path="stores" element={<MedicalStores />} />
          <Route path="sales" element={<Sales />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
