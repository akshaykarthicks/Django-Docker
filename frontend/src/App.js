import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CodeGenerator from './pages/CodeGenerator';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<CodeGenerator />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;