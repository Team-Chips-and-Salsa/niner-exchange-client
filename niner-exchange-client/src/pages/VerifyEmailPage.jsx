import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function VerifyEmailPage() {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/auth/verify-email/${uidb64}/${token}/`,
                    { method: 'GET' },
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Verification failed.');
                }

                setMessage(data.message);
                setError(false);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } catch (err) {
                setMessage(err.message);
                setError(true);
            }
        };

        verify();
    }, [uidb64, token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 bg-white rounded-lg shadow-xl text-center">
                <h1
                    className={`text-2xl font-bold ${error ? 'text-red-600' : 'text-emerald-600'}`}
                >
                    {message}
                </h1>
                {!error && (
                    <p className="mt-4 text-gray-600">
                        Redirecting you to the home page...
                    </p>
                )}
            </div>
        </div>
    );
}
