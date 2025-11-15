import React from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';

export default function RightSide({
    isLogin,
    setIsLogin,
    onLoginSubmit,
    onRegisterSubmit,
    error,
    successMessage,
}) {
    return (
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full opacity-10 -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600 rounded-full opacity-10 translate-y-36 -translate-x-36"></div>

            <div className="relative z-10 max-w-md mx-auto w-full">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {isLogin ? 'Welcome Back' : 'Join Us'}
                    </h2>
                    <p className="text-sm sm:text-base text-emerald-100">
                        {isLogin
                            ? 'Sign in to your account'
                            : 'Create your account'}
                    </p>
                </div>

                {isLogin ? (
                    <LoginForm onSubmit={onLoginSubmit} />
                ) : (
                    <RegisterForm onSubmit={onRegisterSubmit} />
                )}

                {successMessage && (
                    <div className="mt-4 p-3 bg-emerald-100 border border-emerald-400 text-emerald-700 rounded-xl text-center text-sm">
                        {successMessage}
                    </div>
                )}

                {/* Display Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center text-sm">
                        {error}
                    </div>
                )}

                {/* Toggle Login/Register */}
                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-sm sm:text-base text-emerald-100">
                        {isLogin
                            ? "Don't have an account?"
                            : 'Already have an account?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-amber-300 hover:text-amber-200 font-semibold transition-colors underline"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
