import { createContext, useContext } from "react";

export const UserContext = createContext()
export const AuthenticateUserProvider = UserContext.Provider
export const useAuthenticateUserContext = () => {
    return useContext(UserContext)
}