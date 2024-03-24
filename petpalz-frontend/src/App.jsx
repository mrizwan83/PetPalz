// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">PetPalz</h1>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <Routes>
            {/* <Route path="/" element={<PetList />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            Add more routes as needed
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;