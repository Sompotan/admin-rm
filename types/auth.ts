export interface LoginResponse {
    id: string;
    role: "admin";
    token: string;
    isVerified: "verified";
}