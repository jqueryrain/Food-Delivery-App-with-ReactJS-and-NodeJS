import { createContext, useContext } from "react"

export const CategoryContext = createContext()
export const CategoryContextProvider = CategoryContext.Provider
export const useCategoryContext = () => {
    return useContext(CategoryContext)
}