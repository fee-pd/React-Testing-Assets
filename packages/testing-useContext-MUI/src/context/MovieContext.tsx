import React from "react";
import { MovieType } from "../types/types";
import { moviesDB } from "../data/movies";

export type ListState = {
  searchTerm: string;
  movies: MovieType[];
};

export const initialState: ListState = {
  searchTerm: "",
  movies: [...moviesDB],
};

type Action =
  | { type: "ADD_MOVIE"; payload: MovieType }
  | { type: "DELETE_MOVIE"; payload: string }
  | { type: "FILTER"; payload: string };

export const MovieContext = React.createContext<{
  state: ListState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const listReducer = (state: ListState, action: Action): ListState => {
  switch (action.type) {
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    case "FILTER":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};
