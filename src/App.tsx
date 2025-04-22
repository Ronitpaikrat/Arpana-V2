import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CreatePostPage } from './pages/CreatePostPage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { useAuthStore } from './store/authStore';

// Private route component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Main layout routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route 
            path="create" 
            element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            } 
          />
          {/* Placeholder routes for other pages */}
          <Route path="reels" element={<div className="py-20 text-center">Reels page coming soon</div>} />
          <Route path="donation" element={<div className="py-20 text-center">Donation page coming soon</div>} />
          <Route path="emergency" element={<div className="py-20 text-center">Emergency donation page coming soon</div>} />
          <Route path="profile" element={<div className="py-20 text-center">Profile page coming soon</div>} />
          <Route path="about" element={<div className="py-20 text-center">About page coming soon</div>} />
          <Route path="contact" element={<div className="py-20 text-center">Contact page coming soon</div>} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;