export interface User {
    isLoggedIn: boolean;
    token: string | null;
    isLoading: boolean;
    error: string | null | undefined;
}

export interface Form {
    username: string;
    password: string;
}
