import React from 'react';
import { Send, Smile, DollarSign } from 'lucide-react';

export default function MessageInput({
    message,
    setMessage,
    onSend,
    disabled,
    onOpenProposal,
}) {
    const canSend = !!message.trim() && !disabled;
    return (
        <div className="p-4 bg-white border-t border-gray-200">
            <div className="w-full">
                <div className="flex items-end gap-2">
                    {onOpenProposal && (
                        <button
                            onClick={onOpenProposal}
                            disabled={disabled}
                            className="p-2 hover:bg-emerald-50 disabled:hover:bg-transparent rounded-lg transition-colors flex-shrink-0 group"
                            title="Create Transaction Request"
                        >
                            <DollarSign className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                        </button>
                    )}
                    <div className="flex-1 relative">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    onSend();
                                }
                            }}
                            placeholder="Type a message..."
                            rows="1"
                            className="w-full px-4 py-3 pr-10 bg-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>
                    <button
                        onClick={onSend}
                        disabled={!canSend}
                        className="p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    );
}
