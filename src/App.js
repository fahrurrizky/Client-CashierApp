import React from 'react';
import {ChakraProvider} from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from "react-router-dom";


// Components
import Login from './components/Auth/LoginForm';
import ForgotPassword from './components/Auth/ForgotPasswordForm';
import ResetPasswordForm from './components/Auth/ResetPasswordFrom';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCashier from './pages/DashboardCashier';


export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm/>} />
        <Route path="/dashboard-admin" element={<DashboardAdmin/>} />
        <Route path="/dashboard-cashier" element={<DashboardCashier/>} />
      </Routes>
    </ChakraProvider>
  );
}

