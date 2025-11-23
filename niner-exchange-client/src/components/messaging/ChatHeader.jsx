import React from 'react';
import {
    Phone,
    Video,
    Info,
    MoreVertical,
    ArrowLeft,
    CheckCircle,
    Flag,
    Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader({
    otherParticipant,
    currentConversation,
    onBack,
    canComplete,
    isCompleting,
    onCompleteTransaction,
    onDeleteConversation,
}) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuRef = React.useRef(null);

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleReportUser = () => {
        setIsMenuOpen(false);
        if (otherParticipant?.uid) {
            navigate(`/report/user/${otherParticipant.uid}`);
        }
    };

    if (!currentConversation || !otherParticipant) return null;

    return (
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onBack && onBack();
                        }}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Back to conversations"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative flex-shrink-0">
                        <img
                            src={currentConversation.listingImage}
                            alt={'Listing Image'}
                            className="w-10 h-10 rounded-full object-cover aspect-square"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {`${otherParticipant.name} - ${currentConversation.listingTitle}`}
                        </h2>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-emerald-700 font-medium">
                                {`Asking Price: $${currentConversation.listingPrice}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {canComplete && (
                        <button
                            onClick={onCompleteTransaction}
                            disabled={isCompleting}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400 transition-colors"
                        >
                            <CheckCircle className="w-5 h-5" />
                            {isCompleting
                                ? 'Completing...'
                                : 'Complete Transaction'}
                        </button>
                    )}
                    <div className="relative" ref={menuRef}>
                        <button
                            //onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200 py-1">
                                {/*<button
                                    onClick={handleReportUser}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Flag className="w-4 h-4" />
                                    Report User
                                </button>*/}
                                {/* <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onDeleteConversation &&
                                            onDeleteConversation();
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Conversation
                                </button> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
