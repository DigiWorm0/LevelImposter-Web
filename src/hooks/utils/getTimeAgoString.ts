/**
 * Returns a string that represents the time difference between the current time and the given time.
 * @param createdAt - The time to compare to the current time.
 * @returns A string that represents the time difference between the current time and the given time.
 */
export default function getTimeAgoString(createdAt: number): string {
    const diff = new Date().getTime() - createdAt;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0)
        return `${days} day${days > 1 ? 's' : ''} ago`;
    else if (hours > 0)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    else if (minutes > 0)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    else if (diff > 0)
        return 'just now';
    else
        return 'in the future';
}