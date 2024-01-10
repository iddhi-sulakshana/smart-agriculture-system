import { jwtDecode } from "jwt-decode";

export default function JWTDecode(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (currentTime > decoded.exp) {
                // Token is expired
                return { error: "Token has expired" };
            }
        }
        return decoded;
    } catch (e) {
        return null;
    }
}
