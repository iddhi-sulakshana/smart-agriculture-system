import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "react-toastify";

export function DisplayRelativeTime(timestamp) {
    try {
        const date = parseISO(timestamp);
        const timeAgo = formatDistanceToNow(date, { addSuffix: true });

        // if less than 1 minute ago return "just now"
        if (timeAgo === "less than a minute ago") {
            return "just now";
        }

        return timeAgo;
    } catch (error) {
        toast.error("Error displaying time: " + error.message);
        return "";
    }
}
