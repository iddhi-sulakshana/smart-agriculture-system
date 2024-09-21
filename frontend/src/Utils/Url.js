const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

// get the url of the backend api endpoint when given the subpart
export const getURL = (subPart) => {
    return `${BACKEND_URL}/api/${subPart}`;
};

// get the url of the backend root endpoint when given the subpart
export const getRootURL = (subPart) => {
    return `${BACKEND_URL}/${subPart}`;
};

export const getPaypalClientId = () => {
    return PAYPAL_CLIENT_ID;
};
