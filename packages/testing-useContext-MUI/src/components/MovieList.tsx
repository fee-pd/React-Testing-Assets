import React, { useContext } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Movie from "./Movie";
import { MovieContext } from "../context/MovieContext";

const MovieList = () => {
  const { state } = useContext(MovieContext);

  const filteredMovies = state.movies.filter(
    (m) =>
      m.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  return (
    <List>
      {filteredMovies.map((movie) => (
        <ListItem key={movie.id}>
          <ListItemText>
            <Movie {...movie} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default MovieList;
