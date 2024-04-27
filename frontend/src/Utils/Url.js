const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "https://localhost:3000";

// get the url of the backend api endpoint when given the subpart
export const getURL = (subPart) => {
    return `${BACKEND_URL}/api/${subPart}`;
};

// get the url of the backend root endpoint when given the subpart
export const getRootURL = (subPart) => {
    return `${BACKEND_URL}/${subPart}`;
};
