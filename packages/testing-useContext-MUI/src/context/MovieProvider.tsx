import React, { useReducer } from "react";
import { initialState, listReducer, MovieContext } from "./MovieContext";

type ListContextProviderProps = {
  children: React.ReactNode;
};

export const MovieProvider: React.FC<ListContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};