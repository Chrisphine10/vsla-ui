import React from 'react';
import { Container } from '@mui/material';
import './App.css'; // You can create this file to add custom styles if needed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from './component/dashboard/Dashboard';
import { AuthProvider } from "./helper/auth/AuthProvider";
import MemberView from './component/members/MemberView';
import AddMember from './component/members/AddMember';
import Members from './component/members/Members';
import Groups from './component/groups/Groups';
import AddGroup from './component/groups/AddGroup';
import GroupView from './component/groups/GroupView';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  const defaultTheme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <AuthProvider>
            <Router>
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/members/add" element={<AddMember />} />
                  <Route path="/members/add/:id" element={<AddMember />} />
                  <Route path="/members/:id" element={<MemberView />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/groups/add" element={<AddGroup />} />
                  <Route path="/groups/add/:id" element={<AddGroup />} />
                  <Route path="/groups/:id" element={<GroupView />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
