// src/components/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const location = useLocation();
    const [verificationStatus, setVerificationStatus] = useState('pending');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        const verifyEmail = async () => {
            try {
                await axios.post('/api/auth/verify-email', { token });
                setVerificationStatus('success');
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('error');
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [location]);

    if (verificationStatus === 'pending') {
        return <div>Verifying email...</div>
    }

    if (verificationStatus === 'success') {
        return <div>Email verified successfully!</div>
    }

    return <div>An error occurred while verifying your email.</div>
};

export default VerifyEmail;