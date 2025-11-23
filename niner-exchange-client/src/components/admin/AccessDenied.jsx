import { X } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center">
                <div className="mb-4">
                    <X className="w-16 h-16 text-red-500 mx-auto" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">You do not have permission to access the admin portal.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}
