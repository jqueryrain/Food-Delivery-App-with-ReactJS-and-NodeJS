import { createContext, useContext } from "react";

export const DishesContext = createContext()
export const DishesContextProvider = DishesContext.Provider
export const useDishContext = () => {
    return useContext(DishesContext)
}