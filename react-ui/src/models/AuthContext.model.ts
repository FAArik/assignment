export interface AuthContextProps {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}