import React from 'react';
import { Container } from '@mui/material';
import './App.css'; // You can create this file to add custom styles if needed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from './component/dashboard/Dashboard';
import { AuthProvider } from "./helper/auth/AuthProvider";

function App() {
  const defaultTheme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <Container>
            <Router>
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </div>
            </Router>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
