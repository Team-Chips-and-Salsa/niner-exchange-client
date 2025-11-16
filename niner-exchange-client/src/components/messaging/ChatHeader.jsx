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
                        <img
                            src={currentConversation.listingImage}
                            alt={'Listing Image'}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {`${otherParticipant.name} - ${currentConversation.listingTitle}`}
                        </h2>
                        <div className="flex items-center gap-2">
                                <p className="text-xs text-emerald-700 font-medium">
                                    {`Asking Price: $${ currentConversation.listingPrice }`}
                                </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
