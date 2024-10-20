import { createContext, useContext } from "react"
export const ProductContext = createContext()
export const ProductContextProvider = ProductContext.Provider;
export const useProductContext = () => {
    return useContext(ProductContext)
}
