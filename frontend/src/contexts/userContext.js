import { useContext, createContext } from "react"


const userContext = createContext()
export const userProvider = userContext.Provider
export const useUserContext = () => {
    return useContext(userContext)
}
