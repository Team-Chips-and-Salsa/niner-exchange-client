import React, { useState } from 'react';
import { Search, Send, MoreVertical, Paperclip, Image, Smile, Phone, Video, Info, ArrowLeft, Crown, Check, CheckCheck } from 'lucide-react';
import NinerExchangeLogo from './assets/logoTestNiner.png';


export default function NinerExchangeMessaging() {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample conversation data
    const conversations = [
        {
            id: 1,
            name: 'Sarah Chen',
            username: '@sarahc',
            avatar: 'SC',
            lastMessage: 'Is the desk still available?',
            time: '2m ago',
            unread: 3,
            online: true,
            listing: 'IKEA Desk - $50',
            messages: [
                { id: 1, sender: 'them', text: 'Hi! I saw your listing for the desk', time: '10:30 AM', read: true },
                { id: 2, sender: 'me', text: 'Hey! Yes, it\'s still available. Would you like to see it?', time: '10:32 AM', read: true },
                { id: 3, sender: 'them', text: 'That would be great! When are you free?', time: '10:35 AM', read: true },
                { id: 4, sender: 'me', text: 'I\'m free tomorrow afternoon. Does 2 PM work for you?', time: '10:36 AM', read: true },
                { id: 5, sender: 'them', text: 'Is the desk still available?', time: '10:38 AM', read: false }
            ]
        },
        {
            id: 2,
            name: 'Marcus Johnson',
            username: '@marcusj',
            avatar: 'MJ',
            lastMessage: 'Thanks for the quick response!',
            time: '1h ago',
            unread: 0,
            online: false,
            listing: 'Calculus Textbook',
            messages: [
                { id: 1, sender: 'them', text: 'Is this the 9th edition?', time: '9:15 AM', read: true },
                { id: 2, sender: 'me', text: 'Yes, it\'s the latest edition with access code', time: '9:20 AM', read: true },
                { id: 3, sender: 'them', text: 'Thanks for the quick response!', time: '9:22 AM', read: true }
            ]
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            username: '@emilyrod',
            avatar: 'ER',
            lastMessage: 'Can we meet at the library?',
            time: '3h ago',
            unread: 1,
            online: true,
            listing: 'Sublease - Spring 2025',
            messages: [
                { id: 1, sender: 'them', text: 'I\'m interested in the sublease!', time: '8:00 AM', read: true },
                { id: 2, sender: 'me', text: 'Great! Would you like to schedule a viewing?', time: '8:05 AM', read: true },
                { id: 3, sender: 'them', text: 'Can we meet at the library?', time: '8:10 AM', read: false }
            ]
        },
        {
            id: 4,
            name: 'David Park',
            username: '@davidp',
            avatar: 'DP',
            lastMessage: 'What\'s your venmo?',
            time: '5h ago',
            unread: 0,
            online: false,
            listing: 'Mini Fridge',
            messages: [
                { id: 1, sender: 'them', text: 'I\'ll take it!', time: '6:00 AM', read: true },
                { id: 2, sender: 'me', text: 'Awesome! When can you pick it up?', time: '6:05 AM', read: true },
                { id: 3, sender: 'them', text: 'What\'s your venmo?', time: '6:10 AM', read: true }
            ]
        },
        {
            id: 5,
            name: 'Jessica Lee',
            username: '@jessical',
            avatar: 'JL',
            lastMessage: 'You: Sure, I can help with that',
            time: 'Yesterday',
            unread: 0,
            online: false,
            listing: 'Tutoring - Math',
            messages: [
                { id: 1, sender: 'them', text: 'Are you available for tutoring this week?', time: 'Yesterday', read: true },
                { id: 2, sender: 'me', text: 'Sure, I can help with that', time: 'Yesterday', read: true }
            ]
        }
    ];

    const handleSendMessage = () => {
        if (message.trim() && selectedConversation) {
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.listing.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentConversation = conversations.find(c => c.id === selectedConversation);

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 sm:px-6 py-4 shadow-lg">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                            <img src={NinerExchangeLogo} alt="Niner Exchange Logo" className="w-20 h-20 sm:w-14 md:h-14 object-contain" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold">Niner Exchange</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors hidden sm:block">
                            Dashboard
                        </button>
                        <button className="px-4 py-2 text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors hidden sm:block">
                            Profile
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden max-w-screen-2xl mx-auto w-full">
                {/* Conversations List */}
                <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} md:w-96 w-full bg-white border-r border-gray-200 flex-col`}>
                    {/* Search */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv.id)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                                    selectedConversation === conv.id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
                                }`}
                            >
                                <div className="flex gap-3">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                                            {conv.avatar}
                                        </div>
                                        {conv.online && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">{conv.name}</h3>
                                                <p className="text-xs text-gray-500">{conv.username}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">{conv.time}</span>
                                                {conv.unread > 0 && (
                                                    <div className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                        {conv.unread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-emerald-700 font-medium mb-1">Re: {conv.listing}</p>
                                        <p className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                {selectedConversation ? (
                    <div className="flex-1 flex flex-col bg-white">
                        {/* Chat Header */}
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedConversation(null)}
                                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                                            {currentConversation?.avatar}
                                        </div>
                                        {currentConversation?.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">{currentConversation?.name}</h2>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-gray-500">{currentConversation?.username}</p>
                                            <span className="text-gray-300">•</span>
                                            <p className="text-xs text-emerald-700 font-medium">{currentConversation?.listing}</p>
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

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
                            <div className="max-w-4xl mx-auto space-y-4">
                                {currentConversation?.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-md sm:max-w-lg ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                                            <div
                                                className={`px-4 py-3 rounded-2xl ${
                                                    msg.sender === 'me'
                                                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-br-sm'
                                                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                                }`}
                                            >
                                                <p className="text-sm sm:text-base">{msg.text}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 mt-1 px-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-xs text-gray-500">{msg.time}</span>
                                                {msg.sender === 'me' && (
                                                    msg.read ? (
                                                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                                                    ) : (
                                                        <Check className="w-4 h-4 text-gray-400" />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-end gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                                        <Paperclip className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 hidden sm:block">
                                        <Image className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <div className="flex-1 relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder="Type a message..."
                        rows="1"
                        className="w-full px-4 py-3 pr-10 bg-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                                        <button className="absolute right-2 bottom-2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                                            <Smile className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className="p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex-shrink-0"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">
                                    Press Enter to send, Shift + Enter for new line
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <img src={NinerExchangeLogo} alt="Niner Exchange Logo" className="w-20 h-20 sm:w-14 md:h-14 object-contain" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Messages</h3>
                            <p className="text-gray-600">Select a conversation to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}