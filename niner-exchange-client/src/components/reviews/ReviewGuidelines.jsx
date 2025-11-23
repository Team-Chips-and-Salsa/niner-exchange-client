import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ReviewGuidelines() {
    return (
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Review Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Be honest and fair in your assessment</li>
                <li>• Focus on your transaction experience</li>
                <li>• Avoid offensive or inappropriate language</li>
                <li>• Reviews cannot be edited once submitted</li>
            </ul>
        </div>
    );
}
