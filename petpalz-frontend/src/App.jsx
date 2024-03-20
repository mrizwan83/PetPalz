// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';

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
            <Route path="/" element={<PetList />} />
            Add more routes as needed
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;