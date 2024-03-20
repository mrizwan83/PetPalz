// src/components/PetList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPets } from '../redux/petSlice';

const PetList = () => {
    const dispatch = useDispatch();
    const { userPets, loading, error } = useSelector((state) => state.pets);
    const userId = '...'; // Replace with the actual user ID

    useEffect(() => {
        dispatch(fetchUserPets({ userId, page: 1, limit: 10, sort: '-createdAt' }));
    }, [dispatch, userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* {userPets.map((pet) => (
                    <div key={pet._id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-semibold">{pet.name}</h3>
                        <p className="text-gray-500">Species: {pet.species}</p>
                        <p className="text-gray-500">Breed: {pet.breed}</p>
                        <p className="text-gray-500">Age: {pet.age}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default PetList;