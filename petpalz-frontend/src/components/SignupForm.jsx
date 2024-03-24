// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/authSlice';

const SignupForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(signupUser({ name, email, password })).unwrap();
            console.log('Signup result:', result);
            setSignupSuccess(true);
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error case
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Signup
                </button>
            </form>
            {signupSuccess && (
                <div>
                    <p>Registration successful! Please check your email to verify your account.</p>
                    <p>If you don't see the verification email, please check your spam folder.</p>
                </div>
            )}
        </div>
    );
};

export default SignupForm;