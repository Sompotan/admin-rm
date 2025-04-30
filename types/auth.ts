export interface LoginResponse {
    id: string;
    role: "api";
    token: string;
    isVerified: "verified";
}