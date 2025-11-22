import React from 'react';
import { Search } from 'lucide-react';
import { formatRelativeTime, getAvatarInitials } from '../../helpers/messaging';

export default function ConversationsList({
    conversations = [],
    currentUser,
    selectedConversationId,
    onSelect,
    searchQuery,
    onSearchChange,
}) {
    return (
        <div
            className={`${selectedConversationId ? 'hidden md:flex' : 'flex'} md:w-96 w-full bg-white border-r border-gray-200 flex-col`}
        >
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => {
                    const otherUid = (conv.participants || []).find(
                        (p) => p !== currentUser?.id,
                    );
                    console.log(conv)
                    const info =
                        conv.participantInfo && otherUid
                            ? conv.participantInfo[otherUid] || {}
                            : {};
                    const name = info.name + ' - ' + conv.listingTitle  || 'Conversation';
                    //TO DO: Add user profile pic
                    const avatar = getAvatarInitials(name || '');
                    const last = conv.lastMessage || '';
                    const time = formatRelativeTime(conv.lastMessageAt);
                    const unread = conv.unreadCounts?.[currentUser?.id] || 0;
                    const listing = conv.listing || '';
                    const isSelected = selectedConversationId === conv.id;

                    return (
                        <div
                            key={conv.id}
                            onClick={() => onSelect(conv.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${isSelected ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                                        {avatar}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">
                                                {name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                {time}
                                            </span>
                                            {unread > 0 && (
                                                <div className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                    {unread}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {listing && (
                                        <p className="text-xs text-emerald-700 font-medium mb-1">
                                            Re: {listing}
                                        </p>
                                    )}
                                    <p
                                        className={`text-sm truncate ${unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}
                                    >
                                        {last}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
