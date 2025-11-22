import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isSubmitting = false,
    type = 'danger', // 'danger' | 'warning' | 'info'
}) {
    if (!isOpen) return null;

    const colors = {
        danger: {
            icon: 'text-red-600',
            bg: 'bg-red-100',
            button: 'bg-red-600 hover:bg-red-700',
        },
        warning: {
            icon: 'text-amber-600',
            bg: 'bg-amber-100',
            button: 'bg-amber-600 hover:bg-amber-700',
        },
        info: {
            icon: 'text-blue-600',
            bg: 'bg-blue-100',
            button: 'bg-blue-600 hover:bg-blue-700',
        },
    };

    const theme = colors[type] || colors.danger;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div
                            className={`w-10 h-10 ${theme.bg} rounded-full flex items-center justify-center`}
                        >
                            <AlertTriangle
                                className={`w-5 h-5 ${theme.icon}`}
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className={`px-4 py-2 text-white font-medium rounded-lg shadow-sm transition-all flex items-center gap-2 ${theme.button} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
