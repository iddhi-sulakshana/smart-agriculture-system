import { formatDistanceToNow, parseISO } from "date-fns";

export function DisplayRelativeTime(timestamp) {
    const date = parseISO(timestamp);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });

    return timeAgo;
}
