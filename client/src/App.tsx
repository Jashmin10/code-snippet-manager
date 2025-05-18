import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SnippetEditor from './components/SnippetEditor';
import SnippetsPage from './pages/SnippetsPage';
import CreateSnippet from './pages/CreateSnippet';
import { Snippet } from './types/snippet';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const { isLoggedIn, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure dark mode is applied immediately
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    
    // Set dark mode styles
    document.documentElement.style.backgroundColor = '#121212';
    document.documentElement.style.color = '#121212';
    document.documentElement.style.transition = 'all 0.3s ease';

    // Set body background to match dark theme
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = '#121212';
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAllSnippetsClick = () => {
    setSelectedLanguage('All');
    navigate('/allsnippets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-800 flex flex-col overflow-hidden">
      <Navbar 
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        user={user}
        onLogout={logout}
        onNewSnippet={() => navigate('/snippets/create')}
      />
      <div className="flex flex-1 pt-16">
        <Sidebar 
          isOpen={isSidebarOpen}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
          toggleSidebar={toggleSidebar}
        />
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="rounded-2xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 p-6 shadow-xl backdrop-blur-sm border border-gray-800/50">
              <Routes>
                <Route path="/" element={<Navigate to="/allsnippets" replace />} />
                <Route path="/allsnippets" element={<SnippetsPage selectedLanguage={selectedLanguage} />} />
                <Route path="/snippets/create" element={<CreateSnippet />} />
                <Route path="/editor/new" element={<SnippetEditor />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;