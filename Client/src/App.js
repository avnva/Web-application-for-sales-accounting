import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';

import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import PrivateRoute from 'components/route/PrivateRoute';
import { AuthProvider } from 'contexts/AuthContext';
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <AuthProvider>
        <Routes>
          {/* Авторизация */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/* Защищённый маршрут */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout
                  theme={currentTheme}
                  setTheme={setCurrentTheme}
                />
              </PrivateRoute>
            }
          />

          {/* Редирект с корня */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}
