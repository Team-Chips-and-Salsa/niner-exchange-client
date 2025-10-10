import React from 'react';
import { Phone, Video, Info, MoreVertical, ArrowLeft } from 'lucide-react';

export default function ChatHeader({
    otherParticipant,
    currentConversation,
    onBack,
}) {
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
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                            {otherParticipant.avatar}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {otherParticipant.name}
                        </h2>
                        <div className="flex items-center gap-2">
                            {otherParticipant.username && (
                                <p className="text-xs text-gray-500">
                                    {otherParticipant.username}
                                </p>
                            )}
                            {currentConversation?.listing && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <p className="text-xs text-emerald-700 font-medium">
                                        {currentConversation?.listing}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                        <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
                        <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Info className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
