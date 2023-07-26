import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { MovieContext } from "../context/MovieContext";

const MovieForm = () => {
  const [movieData, setMovieData] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const { dispatch } = useContext(MovieContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: "ADD_MOVIE",
      payload: { id: Date.now().toString(), ...movieData },
    });
    setMovieData({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        value={movieData.name ?? ""}
        onChange={handleInputChange}
        placeholder="Movie name"
      />
      <TextField
        name="description"
        value={movieData.description ?? ""}
        onChange={handleInputChange}
        placeholder="Movie description"
      />
      <Button variant="contained" color="primary" type="submit">
        Add Movie
      </Button>
    </form>
  );
};

export default MovieForm;
