export default function getTimeAgoString(createdAt: number) {
    const diff = new Date().getTime() - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    if (days > 0)
        return `${days} day${days > 1 ? 's' : ''} ago`;
    else if (hours > 0)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    else if (minutes > 0)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    else if (seconds > 0)
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    else
        return 'just now';
}