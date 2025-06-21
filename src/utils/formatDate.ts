/**
 * Formats a date string into a readable time format (e.g., "12:00 PM")
 * @param dateString - ISO date string or Date object
 * @returns Formatted time string (e.g., "10:19 AM")
 */
export const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minutes with leading zero if needed
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes} ${ampm}`;
};

/**
 * Formats a date string into a full date and time string (e.g., "June 18, 2025, 10:19 AM")
 * @param dateString - ISO date string or Date object
 * @returns Formatted date and time string
 */
export const formatFullDate = (dateString: string | Date): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return date.toLocaleDateString('en-US', options);
};