// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [health, setHealth] = useState('');

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/health');
                setHealth(response.data.message);
            } catch (error) {
                console.error('Error fetching server health:', error);
                setHealth('Error fetching server health');
            }
        };

        fetchHealth();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Welcome to PetPalz</h1>
            <p className="mb-4">Server Status: {health}</p>
            {/* Add dummy data and fillers */}
            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Featured Pets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Dummy pet cards */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold">Buddy</h3>
                        <p className="text-gray-500">Species: Dog</p>
                        <p className="text-gray-500">Breed: Labrador Retriever</p>
                        <p className="text-gray-500">Age: 3 years</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold">Whiskers</h3>
                        <p className="text-gray-500">Species: Cat</p>
                        <p className="text-gray-500">Breed: Siamese</p>
                        <p className="text-gray-500">Age: 2 years</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold">Goldie</h3>
                        <p className="text-gray-500">Species: Fish</p>
                        <p className="text-gray-500">Breed: Goldfish</p>
                        <p className="text-gray-500">Age: 1 year</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;