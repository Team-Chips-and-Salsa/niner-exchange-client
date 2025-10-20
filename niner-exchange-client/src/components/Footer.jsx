import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/*Used AI to help me learn more about tailwind css.
The design of the footer is based off our team's figma design */
export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Crown className="w-6 h-6 text-amber-400" />
                            <h4 className="font-bold text-lg">
                                Niner Exchange
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The trusted marketplace for the UNCC community
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4">Categories</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <button
                                    type="button"
                                    className="hover:text-white transition-colors"
                                    onClick={() => navigate('/')}
                                >
                                    Textbooks
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="hover:text-white transition-colors"
                                    onClick={() => navigate('/')}
                                >
                                    Sub-leasing
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="hover:text-white transition-colors"
                                    onClick={() => navigate('/')}
                                >
                                    Marketplace
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="hover:text-white transition-colors"
                                    onClick={() => navigate('/')}
                                >
                                    Services
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4">Support</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Safety Tips
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Report Issue
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Community Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>
                        © 2025 Niner Exchange. All rights reserved. Built for
                        UNCC students, by UNCC students.
                    </p>
                </div>
            </div>
        </footer>
    );
}
