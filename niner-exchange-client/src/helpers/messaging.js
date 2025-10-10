/**
 * Format a Firestore Timestamp or Date/string into a compact relative time.
 * @param {import('firebase/firestore').Timestamp|Date|string|number|null|undefined} ts
 * @returns {string}
 */
export function formatRelativeTime(ts) {
    if (!ts) return '';
    const date =
        ts && typeof ts === 'object' && 'toDate' in ts
            ? ts.toDate()
            : new Date(ts);
    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString();
}

/**
 * Build initials from a string such as a full name or avatar label.
 * @param {string} input
 * @returns {string}
 */
export function getAvatarInitials(input = '') {
    return (input || '??')
        .split(' ')
        .filter(Boolean)
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

/**
 * From a conversation doc, compute the other participant info relative to current user id.
 * @param {any} conversation
 * @param {string} currentUid
 * @returns {{ uid: string|undefined, name: string, username?: string, avatar: string }}
 */
export function getOtherParticipant(conversation, currentUid) {
    if (!conversation || !currentUid)
        return {
            uid: undefined,
            name: 'Conversation',
            username: '',
            avatar: 'NE',
        };
    const otherUid = (conversation.participants || []).find(
        (p) => p !== currentUid,
    );
    const info =
        conversation.participantInfo && otherUid
            ? conversation.participantInfo[otherUid] || {}
            : {};
    const name = info.name || info.username || otherUid || 'Conversation';
    const username = info.username || '';
    const avatar = getAvatarInitials(info.avatar || name || '');
    return { uid: otherUid, name, username, avatar };
}
